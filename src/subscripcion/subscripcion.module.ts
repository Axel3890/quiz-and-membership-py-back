import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { subscriptionProviders } from './subcricion-providers';
import { SubscripcionService } from './subscripcion.service';
import { SubscripcionController } from './subscripcion.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscripcionController],
  providers: [SubscripcionService, ...subscriptionProviders],
})
export class SubscripcionModule {}
