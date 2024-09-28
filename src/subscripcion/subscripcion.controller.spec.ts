import { Test, TestingModule } from '@nestjs/testing';
import { SubscripcionController } from './subscripcion.controller';
import { SubscripcionService } from './subscripcion.service';

describe('SubscripcionController', () => {
  let controller: SubscripcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscripcionController],
      providers: [SubscripcionService],
    }).compile();

    controller = module.get<SubscripcionController>(SubscripcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
