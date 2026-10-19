import { Controller, Get, Param } from '@nestjs/common';
import { ModelsService } from './models.service.js';

@Controller('api/models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get(':id')
  getModel(@Param('id') id: string) {
    return this.modelsService.getModels(id);
  }
}
