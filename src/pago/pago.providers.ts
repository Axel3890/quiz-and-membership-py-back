import { Pago } from './entities/pago.entity';

export const PagoProvider = [
  {
    provide: 'PAGO_REPOSITORY',
    useValue: Pago,
  },
];
