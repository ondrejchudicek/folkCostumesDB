import {
  Inject,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join, sep } from 'node:path';
import { DRIZZLE } from '../db/database.module.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { relations } from '../db/relations.js';

const UPLOADS_DIR = join(process.cwd(), 'uploads', 'images');

@Injectable()
export class ImagesService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof relations>) {}

  async getImage(id: number) {
    // returns an image with specific id
    const image = await this.db.query.images.findFirst({
      where: { imageID: id },
      columns: { path: true },
    });
    if (!image) throw new NotFoundException();

    const fullPath = join(UPLOADS_DIR, image.path);
    if (!fullPath.startsWith(UPLOADS_DIR + sep)) throw new NotFoundException();

    const file = createReadStream(fullPath);
    return new StreamableFile(file, {
      type: 'image/png, image/jpeg, image/jpg',
      disposition: 'inline',
    });
  }
}
