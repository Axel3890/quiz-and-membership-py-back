import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { moduloProviders } from './module.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ModuloController],
  providers: [ModuloService, ...moduloProviders]
})
export class ModuloModule {}
