
import { Opcion } from './entities/opcion.entity';

export const opcionProviders = [
  {
    provide: 'OPCION_REPOSITORY',
    useValue: Opcion,
  },
];
