import { Test, TestingModule } from '@nestjs/testing';
import { SubtemaController } from './subtema.controller';
import { SubtemaService } from './subtema.service';

describe('SubtemaController', () => {
  let controller: SubtemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtemaController],
      providers: [SubtemaService],
    }).compile();

    controller = module.get<SubtemaController>(SubtemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
