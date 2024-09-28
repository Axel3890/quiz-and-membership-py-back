import { Module } from '@nestjs/common';
import { TemaService } from './tema.service';
import { TemaController } from './tema.controller';
import { DatabaseModule } from 'src/database/database.module';
import { temaProviders } from './tema.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TemaController],
  providers: [TemaService, ...temaProviders],
})
export class TemaModule {}
