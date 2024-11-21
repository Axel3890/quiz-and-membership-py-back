import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from 'src/opcion/entities/opcion.entity';

@Injectable()
export class PreguntaService {
  constructor(
    @Inject('PREGUNTA_REPOSITORY')
    private readonly preguntaRepository: typeof Pregunta,
  ) {}

  async create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
    try {
      return await this.preguntaRepository.create({
        id_subtema: createPreguntaDto.id_subtema,
        year: createPreguntaDto.year,
        texto_pregunta: createPreguntaDto.texto_pregunta,
        explicacion_correcta: createPreguntaDto.explicacion_correcta,
        explicacion_incorrecta: createPreguntaDto.explicacion_incorrecta,
        imagen_video: createPreguntaDto.imagen_video
        
      });
    } catch (error) {
      console.error('Error al crear la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al crear la pregunta', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Pregunta[]> {
    try {
      return await this.preguntaRepository.findAll({include: [{ model: Opcion }]});
    } catch (error) {
      console.error('Error al recuperar las preguntas:', error.message);
      throw new HttpException(error.message || 'Error al recuperar las preguntas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Pregunta> {
    try {
      const pregunta = await this.preguntaRepository.findByPk(id, {include: [{ model: Opcion }]});
      if (!pregunta) {
        console.error('Pregunta no encontrada');
        throw new HttpException('Pregunta no encontrada', HttpStatus.NOT_FOUND);
      }
      return pregunta;
    } catch (error) {
      console.error('Error al recuperar la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al recuperar la pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_pregunta: number, updatePreguntaDto: UpdatePreguntaDto): Promise<[number, Pregunta[]]> {
    try {
      return await this.preguntaRepository.update(
        {
          id_subtema: updatePreguntaDto.id_subtema,
          year: updatePreguntaDto.year,
          texto_pregunta: updatePreguntaDto.texto_pregunta,
          explicacion_correcta: updatePreguntaDto.explicacion_correcta,
          explicacion_incorrecta: updatePreguntaDto.explicacion_incorrecta,
          imagen_video: updatePreguntaDto.imagen_video
        },
        {
          where: { id_pregunta },
          returning: true,
        },
      );
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al actualizar la pregunta', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_pregunta: number): Promise<void> {
    try {
      const pregunta = await this.preguntaRepository.findByPk(id_pregunta);
      if (!pregunta) {
        console.error('Pregunta no encontrada');
        throw new HttpException('Pregunta no encontrada', HttpStatus.NOT_FOUND);
      }
      await pregunta.destroy();
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al eliminar la pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}
