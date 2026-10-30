import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from './images.service.js';

@Controller('api/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  getImage(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.getImage(id);
  }
}
