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
        console.log('inserting' + part.name);
      }),
    );

    await Promise.all(
      initialCostumes[i].images.map(async (image) => {
        await db.insert(images).values([
          {
            name: image.name,
            path: image.path,
            costumeID: KMNCostume.costumeID,
          },
        ]);
        console.log('inserting' + image.name);
      }),
    );
  }

  //------------------Testing

  process.exit(0);
}
main();
