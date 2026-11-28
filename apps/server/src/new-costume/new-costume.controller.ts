import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NewCostumeService } from './new-costume.service.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { costumeFileFilter, costumeStorage } from './upload.config.js';
import { type FormBody } from '../types.js';

@Controller('api/newCostume')
export class NewCostumeController {
  constructor(private readonly newCostumeService: NewCostumeService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'partFiles', maxCount: 20 },
        { name: 'images', maxCount: 20 },
      ],
      {
        storage: costumeStorage,
        limits: { fileSize: 100 * 1024 * 1024 }, // per file
        fileFilter: costumeFileFilter,
      },
    ),
  )
  create(
    @UploadedFiles()
    files: {
      partFiles?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Body() body: FormBody,
  ) {
    return this.newCostumeService.create(body, files);
  }
}
