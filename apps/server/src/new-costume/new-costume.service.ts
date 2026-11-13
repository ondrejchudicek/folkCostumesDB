import {
  BadRequestException,
  Inject,
  Injectable,
  PayloadTooLargeException,
} from '@nestjs/common';
import { join } from 'node:path';
import { DRIZZLE } from '../db/database.module.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { relations } from '../db/relations.js';
import { costumes, images, parts } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { unlink } from 'node:fs/promises';

const UPLOADS_DIR = join(process.cwd(), 'uploads');

@Injectable()
export class NewCostumeService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof relations>) {}

  TOTAL_LIMIT = 200 * 1024 * 1024;
  toArray = (v: unknown): string[] => ([] as string[]).concat((v as any) ?? []);

  async create(
    body: Record<string, any>,
    files: {
      partFiles?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ) {
    const partFiles = files.partFiles ?? [];
    const imageFiles = files.images ?? [];
    const allFiles = [...partFiles, ...imageFiles];

    try {
      const name = String(body.name ?? '').trim();
      const description = String(body.description ?? '');
      const partNames = this.toArray(body.partNames);
      const imageNames = this.toArray(body.imageNames);

      if (!name) throw new BadRequestException('Name is required');
      if (
        partNames.length !== partFiles.length ||
        imageNames.length !== imageFiles.length
      ) {
        throw new BadRequestException('Each file needs a name');
      }
      const total = allFiles.reduce((sum, f) => sum + f.size, 0);
      if (total > this.TOTAL_LIMIT) throw new PayloadTooLargeException();

      return await this.db.transaction(async (tx) => {
        const [costume] = await tx
          .insert(costumes)
          .values({ name, description })
          .returning();

        const newImages = imageFiles.length
          ? await tx
              .insert(images)
              .values(
                imageFiles.map((f, i) => ({
                  name: imageNames[i],
                  path: `${f.filename}`,
                  costumeID: costume.costumeID,
                })),
              )
              .returning()
          : [];

        const newParts = partFiles.length
          ? await tx
              .insert(parts)
              .values(
                partFiles.map((f, i) => ({
                  name: partNames[i],
                  path: `${f.filename}`,
                  costumeID: costume.costumeID,
                })),
              )
              .returning()
          : [];

        // first uploaded image becomes the thumbnail
        if (newImages[0]) {
          await tx
            .update(costumes)
            .set({ thumbnailImageID: newImages[0].imageID })
            .where(eq(costumes.costumeID, costume.costumeID));
          costume.thumbnailImageID = newImages[0].imageID;
        }

        return { ...costume, images: newImages, parts: newParts };
      });
    } catch (err) {
      // nothing is kept if validation or the DB insert fails
      await Promise.all(allFiles.map((f) => unlink(f.path).catch(() => {})));
      throw err;
    }
  }
}
