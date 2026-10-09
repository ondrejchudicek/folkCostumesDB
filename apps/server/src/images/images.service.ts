import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  async getImages(id: string) {
    // TODO: Fetch the file from your database
    // returns all GLBs that a costume with given id contains
    return [
      {
        id: `${id}_1`,
        content: 'Example image content',
      },
      {
        id: `${id}_2`,
        content: 'Example image content',
      },
    ];
  }
}
