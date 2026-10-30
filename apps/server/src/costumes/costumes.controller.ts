import { Controller, Get, Param } from '@nestjs/common';
import { CostumesService } from './costumes.service.js';

@Controller('api/costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  @Get()
  getAvailable() {
    return this.costumesService.getAvailable();
  }

  @Get('/images/:id')
  getImages(@Param('id') id: number) {
    return this.costumesService.getImages(id);
  }

  @Get('/models/:id')
  getParts(@Param('id') id: number) {
    return this.costumesService.getParts(id);
  }
}
