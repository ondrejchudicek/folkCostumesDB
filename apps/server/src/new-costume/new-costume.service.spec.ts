import { Test, TestingModule } from '@nestjs/testing';
import { NewCostumeService } from './new-costume.service.js';

describe('NewCostumeService', () => {
  let service: NewCostumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewCostumeService],
    }).compile();

    service = module.get<NewCostumeService>(NewCostumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
