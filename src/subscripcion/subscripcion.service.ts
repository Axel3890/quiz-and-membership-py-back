
import { Injectable, Inject } from '@nestjs/common';
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
    return this.subscriptionRepository.create({
      id_user: createSubscripcionDto.id_user,
      fecha_inicio: createSubscripcionDto.fecha_inicio,
      fecha_fin: createSubscripcionDto.fecha_fin,
      estado: createSubscripcionDto.estado,
      tipo_suscripcion: createSubscripcionDto.tipo_suscripcion,
      metodo_pago: createSubscripcionDto.metodo_pago,
    });
  }

  async findAll(): Promise<Subscripcion[]> {
    return this.subscriptionRepository.findAll();
  }

  async findOne(id_subscription: number): Promise<Subscripcion> {
    return this.subscriptionRepository.findByPk(id_subscription);
  }

  async update(id_subscription: number, updateSubscripcionDto: UpdateSubscripcionDto): Promise<[number, Subscripcion[]]> {
    return this.subscriptionRepository.update({
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
  }

  async remove(id_subscription: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findByPk(id_subscription);
    if (!subscription) {
      throw new Error('Suscripción no encontrada');
    }
    await subscription.destroy();
  }
}

