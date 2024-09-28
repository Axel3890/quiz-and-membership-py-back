import { Module } from '@nestjs/common';
import { SubtemaService } from './subtema.service';
import { SubtemaController } from './subtema.controller';
import { subtemaProviders } from './subtema.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SubtemaController],
  providers: [SubtemaService, ...subtemaProviders],
})
export class SubtemaModule {}
