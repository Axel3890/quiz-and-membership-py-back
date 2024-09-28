import { Test, TestingModule } from '@nestjs/testing';
import { SubscripcionService } from './subscripcion.service';

describe('SubscripcionService', () => {
  let service: SubscripcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscripcionService],
    }).compile();

    service = module.get<SubscripcionService>(SubscripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
