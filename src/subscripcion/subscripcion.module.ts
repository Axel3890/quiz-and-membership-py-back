import { Module } from '@nestjs/common';
import { SubscripcionService } from './subscripcion.service';
import { SubscripcionController } from './subscripcion.controller';

@Module({
  controllers: [SubscripcionController],
  providers: [SubscripcionService],
})
export class SubscripcionModule {}
