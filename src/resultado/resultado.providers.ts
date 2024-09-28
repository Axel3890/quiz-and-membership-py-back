import { Resultado } from "./entities/resultado.entity";


export const resultadoProviders = [
  {
    provide: 'RESULTADO_REPOSITORY',
    useValue: Resultado,
  },
];
