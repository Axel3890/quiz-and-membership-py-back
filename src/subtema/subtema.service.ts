import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      return await this.subtemaRepository.create({
        nombre_subtema: createSubtemaDto.nombre_subtema,
        id_tema: createSubtemaDto.id_tema,
      });
    } catch (error) {
      console.error('Error al crear el subtema:', error.message);
      throw new HttpException(error.message || 'Error al crear el subtema', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Subtema[]> {
    try {
      return await this.subtemaRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los subtemas:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los subtemas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Subtema> {
    try {
      const subtema = await this.subtemaRepository.findByPk(id);
      if (!subtema) {
        console.error('Subtema no encontrado');
        throw new HttpException('Subtema no encontrado', HttpStatus.NOT_FOUND);
      }
      return subtema;
    } catch (error) {
      console.error('Error al recuperar el subtema:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el subtema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateSubtemaDto: UpdateSubtemaDto): Promise<[number, Subtema[]]> {
    try {
      return await this.subtemaRepository.update(
        {
          nombre_subtema: updateSubtemaDto.nombre_subtema,
          id_tema: updateSubtemaDto.id_tema,
        },
        {
          where: { id_subtema: id },
          returning: true,
        }
      );
    } catch (error) {
      console.error('Error al actualizar el subtema:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el subtema', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const subtema = await this.findOne(id);
      if (!subtema) {
        console.error('Subtema no encontrado');
        throw new HttpException('Subtema no encontrado', HttpStatus.NOT_FOUND);
      }
      await subtema.destroy();
    } catch (error) {
      console.error('Error al eliminar el subtema:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el subtema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
