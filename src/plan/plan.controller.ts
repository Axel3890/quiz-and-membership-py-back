import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPlanDto: CreatePlanDto) {
    try {
      const plan = await this.planService.create(createPlanDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Plan creado exitosamente',
        data: plan,
      };
    } catch (error) {
      console.error('Error al crear el plan:', error.message);
      throw new HttpException(
        error.message || 'Error al crear el plan',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const planes = await this.planService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Planes recuperados exitosamente',
        data: planes,
      };
    } catch (error) {
      console.error('Error al recuperar los planes:', error.message);
      throw new HttpException(
        error.message || 'Error al recuperar los planes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const plan = await this.planService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: `Plan con ID ${id} recuperado exitosamente`,
        data: plan,
      };
    } catch (error) {
      console.error(`Error al recuperar el plan con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al recuperar el plan con ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    try {
      const plan = await this.planService.update(+id, updatePlanDto);
      return {
        statusCode: HttpStatus.OK,
        message: `Plan con ID ${id} actualizado exitosamente`,
        data: plan,
      };
    } catch (error) {
      console.error(`Error al actualizar el plan con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al actualizar el plan con ID ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.planService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: `Plan con ID ${id} eliminado exitosamente`,
      };
    } catch (error) {
      console.error(`Error al eliminar el plan con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al eliminar el plan con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
