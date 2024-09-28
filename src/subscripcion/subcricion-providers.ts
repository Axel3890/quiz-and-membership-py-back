import { Subscripcion } from "./entities/subscripcion.entity";


export const subscriptionProviders = [
  {
    provide: 'SUBSCRIPCION_REPOSITORY',
    useValue: Subscripcion,
  },
];
