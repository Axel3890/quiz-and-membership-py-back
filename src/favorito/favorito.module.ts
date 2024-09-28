import { Module } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { FavoritoController } from './favorito.controller';
import { favoritoProviders } from './favorito.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoritoController],
  providers: [FavoritoService, ...favoritoProviders],
})
export class FavoritoModule {}