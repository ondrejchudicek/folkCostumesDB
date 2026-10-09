import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelsService {
  async getModels(id: string) {
    // TODO: Fetch the file from your database
    // returns all GLBs that a costume with given id contains
    return [
      {
        id: `${id}_1`,
        content: 'Example model content',
      },
      {
        id: `${id}_2`,
        content: 'Example model content',
      },
    ];
  }
}
