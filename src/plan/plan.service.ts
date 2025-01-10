import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @Inject('PLAN_REPOSITORY')
    private readonly planRepository: typeof Plan,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    try {
      return await this.planRepository.create({
        nombre: createPlanDto.nombre,
        descripcion: createPlanDto.descripcion,
        fecha_inicio: createPlanDto.fecha_inicio,
        fecha_fin: createPlanDto.fecha_fin,
        precio: createPlanDto.precio,
        tipo_plan: createPlanDto.tipo_plan
      });
    } catch (error) {
      console.error('Error al crear el plan:', error.message);
      throw new HttpException(
        error.message || 'Error al crear el plan',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Plan[]> {
    try {
      return await this.planRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los planes:', error.message);
      throw new HttpException(
        error.message || 'Error al recuperar los planes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Plan> {
    try {
      const plan = await this.planRepository.findByPk(id);
      if (!plan) {
        throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
      }
      return plan;
    } catch (error) {
      console.error(`Error al recuperar el plan con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al recuperar el plan con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    try {
      const plan = await this.findOne(id); // Verifica si existe el plan
      return await plan.update({
        nombre: updatePlanDto.nombre,
        descripcion: updatePlanDto.descripcion,
        fecha_inicio: updatePlanDto.fecha_inicio,
        fecha_fin: updatePlanDto.fecha_fin,
        precio: updatePlanDto.precio,
        tipo_plan: updatePlanDto.tipo_plan
      });
    } catch (error) {
      console.error(`Error al actualizar el plan con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al actualizar el plan con ID ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const plan = await this.findOne(id); // Verifica si existe el plan
      await plan.destroy();
    } catch (error) {
      console.error(`Error al eliminar el plan con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al eliminar el plan con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
