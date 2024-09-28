
import { Tema } from './entities/tema.entity';

export const temaProviders = [
  {
    provide: 'TEMA_REPOSITORY',
    useValue: Tema,
  },
];
