import { Subtema } from './entities/subtema.entity';

export const subtemaProviders = [
  {
    provide: 'SUBTEMA_REPOSITORY',
    useValue: Subtema,
  },
];
