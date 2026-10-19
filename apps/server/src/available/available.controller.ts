import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller('api/available')
export class AvailableController {
  @Get()
  getAvailable() {
    return JSON.parse(readFileSync('costumes.json', 'utf8'));
  }
}
