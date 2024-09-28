import { Favorito } from './entities/favorito.entity';

export const favoritoProviders = [
  {
    provide: 'FAVORITO_REPOSITORY',
    useValue: Favorito,
  },
];
