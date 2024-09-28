
import { Injectable, Inject } from '@nestjs/common';
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
    return this.resultadoRepository.create({
      id_user: createResultadoDto.id_user,
      id_pregunta: createResultadoDto.id_pregunta,
      respuesta_dada: createResultadoDto.respuesta_dada,
      es_correcta: createResultadoDto.es_correcta,
      fecha_respuesta: createResultadoDto.fecha_respuesta
      
    });
  }

  async findAll(): Promise<Resultado[]> {
    return this.resultadoRepository.findAll();
  }

  async findOne(id: number): Promise<Resultado> {
    return this.resultadoRepository.findByPk(id);
  }

  async update(id_resultado: number, updateResultadoDto: UpdateResultadoDto): Promise<[number, Resultado[]]> {
    return this.resultadoRepository.update(
      {
        id_user: updateResultadoDto.id_user,
        id_pregunta: updateResultadoDto.id_pregunta,
        respuesta_dada: updateResultadoDto.respuesta_dada,
        es_correcta: updateResultadoDto.es_correcta,
        fecha_respuesta: updateResultadoDto.fecha_respuesta,
      },
      {
        where: { id_resultado }, // Aquí cambiamos a id_resultado
        returning: true, // Esto devuelve el resultado actualizado (opcional)
      },
    );
  }

  async remove(id_resultado: number): Promise<void> {
    const resultado = await this.resultadoRepository.findByPk(id_resultado);
    if (!resultado) {
      throw new Error('Resultado no encontrado');
    }
    await resultado.destroy();
  }
}

