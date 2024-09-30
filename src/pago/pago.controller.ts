
import { Injectable, Inject } from '@nestjs/common';
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
    return this.pagoRepository.create({
      id_subscription: createPagoDto.id_subscription,
      monto: createPagoDto.monto,
      fecha_pago: createPagoDto.fecha_pago,
      estado: createPagoDto.estado,
    });
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.findAll();
  }

  async findOne(id_pago: number): Promise<Pago> {
    return this.pagoRepository.findByPk(id_pago);
  }

  async update(id_pago: number, updatePagoDto: UpdatePagoDto): Promise<[number, Pago[]]> {
    return this.pagoRepository.update({
      id_subscription: updatePagoDto.id_subscription,
      monto: updatePagoDto.monto,
      fecha_pago: updatePagoDto.fecha_pago,
      estado: updatePagoDto.estado,
    }, {
      where: { id_pago },
      returning: true,
    });
  }

  async remove(id_pago: number): Promise<void> {
    const pago = await this.pagoRepository.findByPk(id_pago);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }
    await pago.destroy();
  }
}
