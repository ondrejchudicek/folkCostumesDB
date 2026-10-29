import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import type { Database } from '../db/database.js';

@Injectable()
export class ImagesService {
  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}

  getAllImages(costumeID: number) {
    return this.db.query.images.findMany({
      where: { imageID: costumeID },
    });
  }

  async getImage(id: string) {
    // returns an image with specific id

    const file = createReadStream(join(process.cwd(), 'uploads', 'images', id));
    return new StreamableFile(file);
  }
}
