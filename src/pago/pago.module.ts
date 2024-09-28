import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pagoProviders } from './pago.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PagoController],
  providers: [PagoService, ...pagoProviders],
})
export class PagoModule {}
