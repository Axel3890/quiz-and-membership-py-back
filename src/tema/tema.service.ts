import { Injectable, Inject } from '@nestjs/common';
import { Tema } from './entities/tema.entity';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

@Injectable()
export class TemaService {
  constructor(
    @Inject('TEMA_REPOSITORY')
    private temaRepository: typeof Tema,
  ) {}

  async create(createTemaDto: CreateTemaDto): Promise<Tema> {
    return this.temaRepository.create({
      nombre_tema: createTemaDto.nombre_tema,
      id_modulo: createTemaDto.id_modulo,
    });
  }
  async findAll(): Promise<Tema[]> {
    return this.temaRepository.findAll();
  }

  async findOne(id: number): Promise<Tema> {
    return this.temaRepository.findByPk(id);
  }

  async update(id: number, updateTemaDto: UpdateTemaDto): Promise<[number, Tema[]]> {
    return this.temaRepository.update(
      {
        nombre_tema: updateTemaDto.nombre_tema,
        id_modulo: updateTemaDto.id_modulo,
      },
      {
        where: { id },
        returning: true,
      }
    );
  }

  async remove(id: number): Promise<void> {
    const tema = await this.findOne(id);
    await tema.destroy();
  }
}