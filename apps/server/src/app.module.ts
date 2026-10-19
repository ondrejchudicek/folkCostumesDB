import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ModelsModule } from './models/models.module.js';
import { ImagesModule } from './images/images.module.js';
import { AvailableController } from './available/available.controller.js';

@Module({
  imports: [ModelsModule, ImagesModule],
  controllers: [AppController, AvailableController],
  providers: [AppService],
})
export class AppModule {}
