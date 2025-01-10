import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { PagoProvider } from './pago.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PagoController],
  providers: [PagoService, ...PagoProvider],
})
export class PagoModule {}
