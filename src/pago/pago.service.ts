import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './entities/pago.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Inject } from '@nestjs/common';
import { Plan } from '../plan/entities/plan.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PagoService {
  constructor(
    @Inject('PAGO_REPOSITORY')
    private readonly pagoRepository: typeof Pago,
  ) {}


  async create(createPagoDto: Omit<CreatePagoDto, 'id'>): Promise<Pago> {
    try {
      const nuevoPago = await this.pagoRepository.create(createPagoDto);
      return nuevoPago;
    } catch (error) {
      console.error('Error al crear el pago:', error.message);
      throw new HttpException(
        error.message || 'Error al crear el pago',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async findAll(): Promise<Pago[]> {
    try {
      return await this.pagoRepository.findAll({
        include: [
          {
            model: Plan,
          },
          {
            model: User,
          }
        ],
      });
    } catch (error) {
      console.error('Error al recuperar los pagos:', error.message);
      throw new HttpException(
        error.message || 'Error al recuperar los pagos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Pago> {
    try {
      const pago = await this.pagoRepository.findByPk(id);
      if (!pago) {
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }
      return pago;
    } catch (error) {
      console.error(`Error al recuperar el pago con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al recuperar el pago con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    try {
      const pago = await this.findOne(id); // Verifica si el pago existe
      await pago.update(updatePagoDto);
      return pago;
    } catch (error) {
      console.error(`Error al actualizar el pago con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al actualizar el pago con ID ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const pago = await this.findOne(id); // Verifica si el pago existe
      await pago.destroy();
      return { message: `Pago con ID ${id} eliminado exitosamente` };
    } catch (error) {
      console.error(`Error al eliminar el pago con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al eliminar el pago con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
