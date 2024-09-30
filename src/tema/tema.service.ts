import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      return await this.temaRepository.create({
        nombre_tema: createTemaDto.nombre_tema,
        id_modulo: createTemaDto.id_modulo,
      });
    } catch (error) {
      console.error('Error al crear el tema:', error.message);
      throw new HttpException(error.message || 'Error al crear el tema', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Tema[]> {
    try {
      return await this.temaRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los temas:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los temas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Tema> {
    try {
      const tema = await this.temaRepository.findByPk(id);
      if (!tema) {
        console.error('Tema no encontrado');
        throw new HttpException('Tema no encontrado', HttpStatus.NOT_FOUND);
      }
      return tema;
    } catch (error) {
      console.error('Error al recuperar el tema:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTemaDto: UpdateTemaDto): Promise<[number, Tema[]]> {
    try {
      return await this.temaRepository.update(
        {
          nombre_tema: updateTemaDto.nombre_tema,
          id_modulo: updateTemaDto.id_modulo,
        },
        {
          where: { id },
          returning: true,
        }
      );
    } catch (error) {
      console.error('Error al actualizar el tema:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el tema', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const tema = await this.findOne(id);
      if (!tema) {
        console.error('Tema no encontrado');
        throw new HttpException('Tema no encontrado', HttpStatus.NOT_FOUND);
      }
      await tema.destroy();
    } catch (error) {
      console.error('Error al eliminar el tema:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
