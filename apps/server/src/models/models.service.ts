import { Injectable } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class ModelsService {
  async getModels(id: string) {
    // TODO: Fetch the file from your database
    // returns all GLBs that a costume with given id contains

    // this works
    const file = createReadStream(join(process.cwd(), 'uploads', 'models', id));
    return new StreamableFile(file);
  }
}
