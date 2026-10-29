import { Module } from '@nestjs/common';
import { CostumesController } from './costumes.controller.js';
import { CostumesService } from './costumes.service.js';

@Module({
  controllers: [CostumesController],
  providers: [CostumesService],
})
export class CostumesModule {}
