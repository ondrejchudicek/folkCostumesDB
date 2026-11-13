import { Module } from '@nestjs/common';
import { NewCostumeService } from './new-costume.service.js';
import { NewCostumeController } from './new-costume.controller.js';

@Module({
  controllers: [NewCostumeController],
  providers: [NewCostumeService],
})
export class NewCostumeModule {}
