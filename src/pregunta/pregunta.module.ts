import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { preguntaProviders } from './pregunta.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PreguntaController],
  providers: [PreguntaService, ...preguntaProviders],
})
export class PreguntaModule {}