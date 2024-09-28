import { Injectable, Inject } from '@nestjs/common';
import { Modulo } from './entities/modulo.entity';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModuloService {
  constructor(
    @Inject('MODULO_REPOSITORY')
    private moduloRepository: typeof Modulo,
  ) {}

  async create(createModuloDto: CreateModuloDto): Promise<Modulo> {
    return this.moduloRepository.create({
      nombre_modulo: createModuloDto.nombre_modulo,
      imagen: createModuloDto.imagen,
    });
  }

  async findAll(): Promise<Modulo[]> {
    return this.moduloRepository.findAll();
  }

  async findOne(id: number): Promise<Modulo> {
    return this.moduloRepository.findByPk(id);
  }

  async update(id: number, updateModuloDto: UpdateModuloDto): Promise<[number, Modulo[]]> {
    return this.moduloRepository.update(
      {
        nombre_modulo: updateModuloDto.nombre_modulo,
        imagen: updateModuloDto.imagen,
      },
      {
        where: { id },
        returning: true,
      }
    );
  }

  async remove(id: number): Promise<void> {
    const modulo = await this.findOne(id);
    await modulo.destroy();
  }
}
