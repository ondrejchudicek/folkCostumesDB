import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../db/database.module.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { relations } from '../db/relations.js';

@Injectable()
export class CostumesService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof relations>) {}

  async getAvailable() {
    const list = await this.db.query.costumes.findMany({
      columns: {
        costumeID: true,
        name: true,
        description: true,
        thumbnailImageID: true,
      },
    });

    return list.map(({ ...c }) => ({
      ...c,
    }));
  }
  async getImages(id: number) {
    const images = await this.db.query.images.findMany({
      columns: { imageID: true, name: true },
      where: { costumeID: id },
    });

    return images.map(({ ...c }) => ({
      ...c,
    }));
  }

  async getParts(id: number) {
    const parts = await this.db.query.parts.findMany({
      columns: { partID: true, name: true },
      where: { costumeID: id },
    });

    return parts.map(({ ...c }) => ({
      ...c,
    }));
  }
}
