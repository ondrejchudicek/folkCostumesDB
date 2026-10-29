import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ModelsModule } from './models/models.module.js';
import { ImagesModule } from './images/images.module.js';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from './db/relations.js';
import { CostumesModule } from './costumes/costumes.module.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module.js';

@Module({
  imports: [
    ModelsModule,
    ImagesModule,
    DrizzleModule.forRoot({
      drizzle,
      connection: process.env.DATABASE_URL!,
      relations,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CostumesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
