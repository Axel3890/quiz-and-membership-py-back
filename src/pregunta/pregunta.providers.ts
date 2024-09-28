
import { Pregunta } from './entities/pregunta.entity';

export const preguntaProviders = [
  {
    provide: 'PREGUNTA_REPOSITORY',
    useValue: Pregunta,
  },
];
