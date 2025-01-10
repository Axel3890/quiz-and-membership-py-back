import { Plan } from './entities/plan.entity';

export const PlanProvider = [{
  provide: 'PLAN_REPOSITORY',
  useValue: Plan,
}];
