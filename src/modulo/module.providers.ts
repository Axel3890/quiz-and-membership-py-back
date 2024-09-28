import { Modulo } from './entities/modulo.entity';

export const moduloProviders = [
  {
    provide: 'MODULO_REPOSITORY',
    useValue: Modulo,
  },
];
