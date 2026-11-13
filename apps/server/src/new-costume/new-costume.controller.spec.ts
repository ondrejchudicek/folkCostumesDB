import { Test, TestingModule } from '@nestjs/testing';
import { NewCostumeController } from './new-costume.controller.js';

describe('NewCostumeController', () => {
  let controller: NewCostumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewCostumeController],
    }).compile();

    controller = module.get<NewCostumeController>(NewCostumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
