import { Module } from '@nestjs/common';
import { OpcionService } from './opcion.service';
import { OpcionController } from './opcion.controller';
import { DatabaseModule } from 'src/database/database.module';
import { opcionProviders } from './opcion.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [OpcionController],
  providers: [OpcionService, ...opcionProviders],
})
export class OpcionModule {}
