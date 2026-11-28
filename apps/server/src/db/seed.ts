/*
To init DB:
sudo docker compose up -d
npx drizzle-kit push
npx tsx src/db/seed.ts
*/

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { costumes, images, parts } from './schema.js';
import { readFileSync } from 'fs';
import { eq } from 'drizzle-orm';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  //------------------Testing

  interface Part {
    partID: string;
    name: string;
    path: string;
  }

  interface Image {
    imageID: string;
    name: string;
    path: string;
  }

  interface Costume {
    costumeID: string;
    name: string;
    description: string;
    parts: Part[];
    images: Image[];
  }

  const initialCostumes: Costume[] = JSON.parse(
    readFileSync('costumes.json', 'utf8'),
  );

  for (let i = 0; i < initialCostumes.length; i++) {
    const [KMNCostume] = await db
      .insert(costumes)
      .values({
        name: initialCostumes[i].name,
        description: initialCostumes[i].description,
      })
      .returning();

    await Promise.all(
      initialCostumes[i].parts.map(async (part) => {
        await db.insert(parts).values([
          {
            name: part.name,
            path: part.path,
            costumeID: KMNCostume.costumeID,
          },
        ]);
      }),
    );

    for (let j = 0; j < initialCostumes[i].images.length; j++) {
      const insertedImages = await db
        .insert(images)
        .values([
          {
            name: initialCostumes[i].images[j].name,
            path: initialCostumes[i].images[j].path,
            costumeID: KMNCostume.costumeID,
            //isThumbnail: j === 0,
          },
        ])
        .returning({
          imageID: images.imageID,
        });

      if (j === 0) {
        await db
          .update(costumes)
          .set({
            thumbnailImageID: insertedImages[0].imageID,
          })
          .where(eq(costumes.costumeID, KMNCostume.costumeID));
      }
    }
  }

  /*await db
    .update(costumes)
    .set({ thumbnailImageID: images.imageID })
    .from(images)
    .where(
      and(
        eq(images.costumeID, costumes.costumeID),
        eq(images.isThumbnail, true),
      ),
    );*/

  //------------------Testing

  process.exit(0);
}
main();
