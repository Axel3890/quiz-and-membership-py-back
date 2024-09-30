import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { UpdateOpcionDto } from './dto/update-opcion.dto';
import { Opcion } from './entities/opcion.entity';

@Injectable()
export class OpcionService {
  constructor(
    @Inject('OPCION_REPOSITORY')
    private readonly opcionRepository: typeof Opcion,
  ) {}

  async create(createOpcionDto: CreateOpcionDto): Promise<Opcion> {
    try {
      return await this.opcionRepository.create({
        id_pregunta: createOpcionDto.id_pregunta,
        texto_opcion: createOpcionDto.texto_opcion,
        es_correcta: createOpcionDto.es_correcta,
        explicacion_correcta: createOpcionDto.explicacion_correcta,
        explicacion_incorrecta: createOpcionDto.explicacion_incorrecta,
        imagen_video: createOpcionDto.imagen_video,
      });
    } catch (error) {
      console.error('Error al crear la opción:', error.message);
      throw new HttpException(error.message || 'Error al crear la opción', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Opcion[]> {
    try {
      return await this.opcionRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar las opciones:', error.message);
      throw new HttpException(error.message || 'Error al recuperar las opciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id_opcion: number): Promise<Opcion> {
    try {
      const opcion = await this.opcionRepository.findByPk(id_opcion);
      if (!opcion) {
        console.error('Opción no encontrada');
        throw new HttpException('Opción no encontrada', HttpStatus.NOT_FOUND);
      }
      return opcion;
    } catch (error) {
      console.error('Error al recuperar la opción:', error.message);
      throw new HttpException(error.message || 'Error al recuperar la opción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_opcion: number, updateOpcionDto: UpdateOpcionDto): Promise<[number, Opcion[]]> {
    try {
      return await this.opcionRepository.update(
        {
          id_pregunta: updateOpcionDto.id_pregunta,
          texto_opcion: updateOpcionDto.texto_opcion,
          es_correcta: updateOpcionDto.es_correcta,
          explicacion_correcta: updateOpcionDto.explicacion_correcta,
          explicacion_incorrecta: updateOpcionDto.explicacion_incorrecta,
          imagen_video: updateOpcionDto.imagen_video,
        },
        {
          where: { id_opcion },
          returning: true,
        },
      );
    } catch (error) {
      console.error('Error al actualizar la opción:', error.message);
      throw new HttpException(error.message || 'Error al actualizar la opción', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_opcion: number): Promise<void> {
    try {
      const opcion = await this.opcionRepository.findByPk(id_opcion);
      if (!opcion) {
        console.error('Opción no encontrada');
        throw new HttpException('Opción no encontrada', HttpStatus.NOT_FOUND);
      }
      await opcion.destroy();
    } catch (error) {
      console.error('Error al eliminar la opción:', error.message);
      throw new HttpException(error.message || 'Error al eliminar la opción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
