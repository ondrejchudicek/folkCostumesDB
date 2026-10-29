import { Injectable } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class ModelsService {
  async getModel(id: string) {
    // returns a GLB with specific id

    // this works
    const file = createReadStream(join(process.cwd(), 'uploads', 'models', id));
    return new StreamableFile(file);
  }
}
