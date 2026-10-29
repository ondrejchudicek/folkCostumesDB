import { Inject, Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import type { Database } from '../db/database.js';
import { DRIZZLE } from '../db/database.module.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { relations } from '../db/relations.js';

@Injectable()
export class CostumesService {
  constructor(
    /*@InjectDrizzle()
    private readonly db: Database,*/
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof relations>,
  ) {
    console.log('DB URL:', process.env.DATABASE_URL);
  }

  async getAvailable() {
    const list = await this.db.query.costumes.findMany({
      columns: { costumeID: true, name: true, description: true },
      with: { thumbnail: { columns: { path: true } } },
    });

    return list.map(({ thumbnail, ...c }) => ({
      ...c,
      thumbnailUrl: thumbnail ? `/uploads/images/${thumbnail.path}` : null,
    }));
  }
}
