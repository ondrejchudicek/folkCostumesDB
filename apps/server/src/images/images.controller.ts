import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service.js';

@Controller('api/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  getImage(@Param('id') id: string) {
    return this.imagesService.getImage(id);
  }
}
