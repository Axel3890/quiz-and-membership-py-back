
import { Pago } from './entities/pago.entity';

export const pagoProviders = [
  {
    provide: 'PAGO_REPOSITORY',
    useValue: Pago,
  },
];
