import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service.js';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  getImages(@Param('id') id: string) {
    return this.imagesService.getImages(id);
  }
}
