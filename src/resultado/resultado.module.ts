import { Module } from '@nestjs/common';
import { ResultadoService } from './resultado.service';
import { ResultadoController } from './resultado.controller';
import { resultadoProviders } from './resultado.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResultadoController],
  providers: [ResultadoService, ...resultadoProviders],
})
export class ResultadoModule {}
