import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { DatabaseModule } from 'src/database/database.module';
import { comentarioProviders } from './comentario.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ComentariosController],
  providers: [ComentariosService, ...comentarioProviders],
})
export class ComentariosModule {}
