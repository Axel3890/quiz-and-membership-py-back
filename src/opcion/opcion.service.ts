// src/opcion/opcion.service.ts
import { Injectable, Inject } from '@nestjs/common';
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
    return this.opcionRepository.create({
      id_pregunta: createOpcionDto.id_pregunta,
      texto_opcion: createOpcionDto.texto_opcion,
      es_correcta: createOpcionDto.es_correcta,
      explicacion_correcta: createOpcionDto.explicacion_correcta,
      explicacion_incorrecta: createOpcionDto.explicacion_incorrecta,
      imagen_video: createOpcionDto.imagen_video,
    });
  }

  async findAll(): Promise<Opcion[]> {
    return this.opcionRepository.findAll();
  }

  async findOne(id_opcion: number): Promise<Opcion> {
    return this.opcionRepository.findByPk(id_opcion);
  }

  async update(id_opcion: number, updateOpcionDto: UpdateOpcionDto): Promise<[number, Opcion[]]> {
    return this.opcionRepository.update({
      id_pregunta: updateOpcionDto.id_pregunta,
      texto_opcion: updateOpcionDto.texto_opcion,
      es_correcta: updateOpcionDto.es_correcta,
      explicacion_correcta: updateOpcionDto.explicacion_correcta,
      explicacion_incorrecta: updateOpcionDto.explicacion_incorrecta,
      imagen_video: updateOpcionDto.imagen_video,
    }, {
      where: { id_opcion },
      returning: true,
    });
  }

  async remove(id_opcion: number): Promise<void> {
    const opcion = await this.opcionRepository.findByPk(id_opcion);
    if (!opcion) {
      throw new Error('Opción no encontrada');
    }
    await opcion.destroy();
  }
}

