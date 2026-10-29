import { Controller, Get, Param } from '@nestjs/common';
import { readFileSync } from 'fs';
import { CostumesService } from './costumes.service.js';

@Controller('api/costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  /*@Get()
  getAvailable() {
    return JSON.parse(readFileSync('costumes.json', 'utf8'));
  }*/

  @Get()
  getAvailable() {
    return this.costumesService.getAvailable();
  }

  @Get(':id')
  getCostume(@Param('id') id: string) {
    return 'returns the lists of images and parts of a requested costume';
  }
}
