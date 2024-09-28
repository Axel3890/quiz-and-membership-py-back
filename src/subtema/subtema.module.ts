import { Module } from '@nestjs/common';
import { SubtemaService } from './subtema.service';
import { SubtemaController } from './subtema.controller';

@Module({
  controllers: [SubtemaController],
  providers: [SubtemaService],
})
export class SubtemaModule {}
