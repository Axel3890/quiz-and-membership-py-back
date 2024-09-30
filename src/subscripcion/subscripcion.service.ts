import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Subscripcion } from './entities/subscripcion.entity';
import { CreateSubscripcionDto } from './dto/create-subscripcion.dto';
import { UpdateSubscripcionDto } from './dto/update-subscripcion.dto';

@Injectable()
export class SubscripcionService {
  constructor(
    @Inject('SUBSCRIPCION_REPOSITORY')
    private readonly subscriptionRepository: typeof Subscripcion,
  ) {}

  async create(createSubscripcionDto: CreateSubscripcionDto): Promise<Subscripcion> {
    try {
      return await this.subscriptionRepository.create({
        id_user: createSubscripcionDto.id_user,
        fecha_inicio: createSubscripcionDto.fecha_inicio,
        fecha_fin: createSubscripcionDto.fecha_fin,
        estado: createSubscripcionDto.estado,
        tipo_suscripcion: createSubscripcionDto.tipo_suscripcion,
        metodo_pago: createSubscripcionDto.metodo_pago,
      });
    } catch (error) {
      console.error('Error al crear la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al crear la suscripción', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Subscripcion[]> {
    try {
      return await this.subscriptionRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar las suscripciones:', error.message);
      throw new HttpException(error.message || 'Error al recuperar las suscripciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id_subscription: number): Promise<Subscripcion> {
    try {
      const subscription = await this.subscriptionRepository.findByPk(id_subscription);
      if (!subscription) {
        console.error('Suscripción no encontrada');
        throw new HttpException('Suscripción no encontrada', HttpStatus.NOT_FOUND);
      }
      return subscription;
    } catch (error) {
      console.error('Error al recuperar la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al recuperar la suscripción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_subscription: number, updateSubscripcionDto: UpdateSubscripcionDto): Promise<[number, Subscripcion[]]> {
    try {
      return await this.subscriptionRepository.update({
        id_user: updateSubscripcionDto.id_user,
        fecha_inicio: updateSubscripcionDto.fecha_inicio,
        fecha_fin: updateSubscripcionDto.fecha_fin,
        estado: updateSubscripcionDto.estado,
        tipo_suscripcion: updateSubscripcionDto.tipo_suscripcion,
        metodo_pago: updateSubscripcionDto.metodo_pago,
      }, {
        where: { id_subscription },
        returning: true,
      });
    } catch (error) {
      console.error('Error al actualizar la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al actualizar la suscripción', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_subscription: number): Promise<void> {
    try {
      const subscription = await this.subscriptionRepository.findByPk(id_subscription);
      if (!subscription) {
        console.error('Suscripción no encontrada');
        throw new HttpException('Suscripción no encontrada', HttpStatus.NOT_FOUND);
      }
      await subscription.destroy();
    } catch (error) {
      console.error('Error al eliminar la suscripción:', error.message);
      throw new HttpException(error.message || 'Error al eliminar la suscripción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}


