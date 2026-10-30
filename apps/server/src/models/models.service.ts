import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join, sep } from 'node:path';
import { DRIZZLE } from '../db/database.module.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { relations } from '../db/relations.js';

const UPLOADS_DIR = join(process.cwd(), 'uploads', 'models');

@Injectable()
export class ModelsService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof relations>) {}

  async getModel(id: number) {
    // returns a model with specific id
    const part = await this.db.query.parts.findFirst({
      where: { partID: id },
      columns: { path: true },
    });
    if (!part) throw new NotFoundException();

    const fullPath = join(UPLOADS_DIR, part.path);
    if (!fullPath.startsWith(UPLOADS_DIR + sep)) throw new NotFoundException();

    const file = createReadStream(fullPath);
    return new StreamableFile(file, {
      type: 'model/gltf-binary',
      disposition: 'inline',
    });
  }

  /*async getModel(id: string) {
    // returns a GLB with specific id

    // this works
    const file = createReadStream(join(process.cwd(), 'uploads', 'models', id));
    return new StreamableFile(file);
  }*/
}
