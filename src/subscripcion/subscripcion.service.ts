import { Injectable } from '@nestjs/common';
import { CreateSubscripcionDto } from './dto/create-subscripcion.dto';
import { UpdateSubscripcionDto } from './dto/update-subscripcion.dto';

@Injectable()
export class SubscripcionService {
  create(createSubscripcionDto: CreateSubscripcionDto) {
    return 'This action adds a new subscripcion';
  }

  findAll() {
    return `This action returns all subscripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscripcion`;
  }

  update(id: number, updateSubscripcionDto: UpdateSubscripcionDto) {
    return `This action updates a #${id} subscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscripcion`;
  }
}
