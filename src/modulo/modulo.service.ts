import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      return await this.moduloRepository.create({
        nombre_modulo: createModuloDto.nombre_modulo,
        imagen: createModuloDto.imagen,
      });
    } catch (error) {
      console.error('Error al crear el módulo:', error.message);
      throw new HttpException(error.message || 'Error al crear el módulo', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Modulo[]> {
    try {
      return await this.moduloRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los módulos:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los módulos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Modulo> {
    try {
      const modulo = await this.moduloRepository.findByPk(id);
      if (!modulo) {
        console.error('Módulo no encontrado');
        throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
      }
      return modulo;
    } catch (error) {
      console.error('Error al recuperar el módulo:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el módulo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateModuloDto: UpdateModuloDto): Promise<[number, Modulo[]]> {
    try {
      return await this.moduloRepository.update(
        {
          nombre_modulo: updateModuloDto.nombre_modulo,
          imagen: updateModuloDto.imagen,
        },
        {
          where: { id },
          returning: true,
        },
      );
    } catch (error) {
      console.error('Error al actualizar el módulo:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el módulo', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const modulo = await this.findOne(id);
      if (!modulo) {
        console.error('Módulo no encontrado');
        throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
      }
      await modulo.destroy();
    } catch (error) {
      console.error('Error al eliminar el módulo:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el módulo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
