import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Resultado } from './entities/resultado.entity';

@Injectable()
export class ResultadoService {
  constructor(
    @Inject('RESULTADO_REPOSITORY')
    private resultadoRepository: typeof Resultado,
  ) {}

  async create(createResultadoDto: CreateResultadoDto): Promise<Resultado> {
    try {
      return await this.resultadoRepository.create({
        id_user: createResultadoDto.id_user,
        id_pregunta: createResultadoDto.id_pregunta,
        respuesta_dada: createResultadoDto.respuesta_dada,
        es_correcta: createResultadoDto.es_correcta,
        fecha_respuesta: createResultadoDto.fecha_respuesta,
      });
    } catch (error) {
      console.error('Error al crear el resultado:', error.message);
      throw new HttpException(error.message || 'Error al crear el resultado', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Resultado[]> {
    try {
      return await this.resultadoRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los resultados:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los resultados', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Resultado> {
    try {
      const resultado = await this.resultadoRepository.findByPk(id);
      if (!resultado) {
        console.error('Error: Resultado no encontrado');
        throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
      }
      return resultado;
    } catch (error) {
      console.error('Error al recuperar el resultado:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_resultado: number, updateResultadoDto: UpdateResultadoDto): Promise<[number, Resultado[]]> {
    try {
      return await this.resultadoRepository.update(
        {
          id_user: updateResultadoDto.id_user,
          id_pregunta: updateResultadoDto.id_pregunta,
          respuesta_dada: updateResultadoDto.respuesta_dada,
          es_correcta: updateResultadoDto.es_correcta,
          fecha_respuesta: updateResultadoDto.fecha_respuesta,
        },
        {
          where: { id_resultado },
          returning: true,
        },
      );
    } catch (error) {
      console.error('Error al actualizar el resultado:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el resultado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_resultado: number): Promise<void> {
    try {
      const resultado = await this.resultadoRepository.findByPk(id_resultado);
      if (!resultado) {
        console.error('Error: Resultado no encontrado');
        throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
      }
      await resultado.destroy();
    } catch (error) {
      console.error('Error al eliminar el resultado:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

