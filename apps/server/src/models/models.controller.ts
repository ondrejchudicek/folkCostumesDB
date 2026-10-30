import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ModelsService } from './models.service.js';

@Controller('api/models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get(':id')
  getModel(@Param('id', ParseIntPipe) id: number) {
    return this.modelsService.getModel(id);
  }
}
