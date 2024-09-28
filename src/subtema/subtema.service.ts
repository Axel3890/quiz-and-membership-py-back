import { Injectable, Inject } from '@nestjs/common';
import { Subtema } from './entities/subtema.entity';
import { CreateSubtemaDto } from './dto/create-subtema.dto';
import { UpdateSubtemaDto } from './dto/update-subtema.dto';

@Injectable()
export class SubtemaService {
  constructor(
    @Inject('SUBTEMA_REPOSITORY')
    private subtemaRepository: typeof Subtema,
  ) {}

  async create(createSubtemaDto: CreateSubtemaDto): Promise<Subtema> {
    return this.subtemaRepository.create({
      nombre_subtema: createSubtemaDto.nombre_subtema,
      id_tema: createSubtemaDto.id_tema,
    });
  }

  async findAll(): Promise<Subtema[]> {
    return this.subtemaRepository.findAll();
  }

  async findOne(id: number): Promise<Subtema> {
    return this.subtemaRepository.findByPk(id);
  }

  async update(id: number, updateSubtemaDto: UpdateSubtemaDto): Promise<[number, Subtema[]]> {
    return this.subtemaRepository.update(
      {
        nombre_subtema: updateSubtemaDto.nombre_subtema,
        id_tema: updateSubtemaDto.id_tema,
      },
      {
        where: { id },
        returning: true,
      }
    );
  }
  async remove(id: number): Promise<void> {
    const subtema = await this.findOne(id);
    await subtema.destroy();
  }
}