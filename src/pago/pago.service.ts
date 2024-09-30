import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';

@Injectable()
export class PagoService {
  constructor(
    @Inject('PAGO_REPOSITORY')
    private readonly pagoRepository: typeof Pago,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    try {
      return await this.pagoRepository.create({
        id_subscription: createPagoDto.id_subscription,
        monto: createPagoDto.monto,
        fecha_pago: createPagoDto.fecha_pago,
        estado: createPagoDto.estado,
      });
    } catch (error) {
      console.error('Error al crear el pago:', error.message);
      throw new HttpException(error.message || 'Error al crear el pago', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Pago[]> {
    try {
      return await this.pagoRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los pagos:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los pagos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id_pago: number): Promise<Pago> {
    try {
      const pago = await this.pagoRepository.findByPk(id_pago);
      if (!pago) {
        console.error('Pago no encontrado');
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }
      return pago;
    } catch (error) {
      console.error('Error al recuperar el pago:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_pago: number, updatePagoDto: UpdatePagoDto): Promise<[number, Pago[]]> {
    try {
      return await this.pagoRepository.update(
        {
          id_subscription: updatePagoDto.id_subscription,
          monto: updatePagoDto.monto,
          fecha_pago: updatePagoDto.fecha_pago,
          estado: updatePagoDto.estado,
        },
        {
          where: { id_pago },
          returning: true,
        },
      );
    } catch (error) {
      console.error('Error al actualizar el pago:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el pago', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_pago: number): Promise<void> {
    try {
      const pago = await this.pagoRepository.findByPk(id_pago);
      if (!pago) {
        console.error('Pago no encontrado');
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }
      await pago.destroy();
    } catch (error) {
      console.error('Error al eliminar el pago:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
