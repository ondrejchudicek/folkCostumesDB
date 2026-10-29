var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ModelsModule,
            ImagesModule,
            DrizzleModule.forRoot({
                drizzle,
                connection: process.env.DATABASE_URL,
                relations,
            }),
            ConfigModule.forRoot({ isGlobal: true }),
            DatabaseModule,
            CostumesModule,
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map