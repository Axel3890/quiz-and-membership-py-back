import { Injectable } from '@nestjs/common';
import { CreateSubtemaDto } from './dto/create-subtema.dto';
import { UpdateSubtemaDto } from './dto/update-subtema.dto';

@Injectable()
export class SubtemaService {
  create(createSubtemaDto: CreateSubtemaDto) {
    return 'This action adds a new subtema';
  }

  findAll() {
    return `This action returns all subtema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subtema`;
  }

  update(id: number, updateSubtemaDto: UpdateSubtemaDto) {
    return `This action updates a #${id} subtema`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtema`;
  }
}
