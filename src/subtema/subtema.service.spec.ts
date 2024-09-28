import { Test, TestingModule } from '@nestjs/testing';
import { SubtemaService } from './subtema.service';

describe('SubtemaService', () => {
  let service: SubtemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtemaService],
    }).compile();

    service = module.get<SubtemaService>(SubtemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
