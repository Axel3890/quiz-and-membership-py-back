import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuloModule } from './modulo/modulo.module';
import { TemaModule } from './tema/tema.module';
import { SubtemaModule } from './subtema/subtema.module';
import { UserModule } from './user/user.module';
import { SubscripcionModule } from './subscripcion/subscripcion.module';
import { PagoModule } from './pago/pago.module';
import { FavoritoModule } from './favorito/favorito.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { OpcionModule } from './opcion/opcion.module';
import { ResultadoModule } from './resultado/resultado.module';
import { DatabaseModule } from './database/database.module';

import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ModuloModule, TemaModule, SubtemaModule, UserModule, SubscripcionModule, PagoModule, FavoritoModule, PreguntaModule, OpcionModule, ResultadoModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
