import { Injectable, Inject } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';

@Injectable()
export class PreguntaService {
  constructor(
    @Inject('PREGUNTA_REPOSITORY')
    private readonly preguntaRepository: typeof Pregunta,
  ) {}

  async create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
    return this.preguntaRepository.create({
      id_subtema: createPreguntaDto.id_subtema,
      year: createPreguntaDto.year,
      texto_pregunta: createPreguntaDto.texto_pregunta,
    });
  }


  async findAll(): Promise<Pregunta[]> {
    return this.preguntaRepository.findAll();
  }

  async findOne(id: number): Promise<Pregunta> {
    return this.preguntaRepository.findByPk(id);
  }

  async update(id_pregunta: number, updatePreguntaDto: UpdatePreguntaDto): Promise<[number, Pregunta[]]> {
    return this.preguntaRepository.update(
      {
        id_subtema: updatePreguntaDto.id_subtema,
        year: updatePreguntaDto.year,
        texto_pregunta: updatePreguntaDto.texto_pregunta,
      },
      {
        where: { id_pregunta },
        returning: true,
      },
    );
  }

  async remove(id_pregunta: number): Promise<void> {
    const pregunta = await this.preguntaRepository.findByPk(id_pregunta);
    if (!pregunta) {
      throw new Error('Pregunta no encontrada');
    }
    await pregunta.destroy();
  }
}
