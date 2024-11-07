import { Module } from '@nestjs/common';

import { PagoparSubscriptionController } from './pagopar.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PagoparSubscriptionController],

})
export class PagoModule {}