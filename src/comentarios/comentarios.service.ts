import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from "./entities/comentario.entity"
import { User } from "src/user/entities/user.entity"
import { Pregunta } from "src/pregunta/entities/pregunta.entity"

@Injectable()
export class ComentariosService {
  constructor(
    @Inject('COMENTARIO_REPOSITORY')
    private readonly comentarioModel: typeof Comentario,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    return await this.comentarioModel.create({ ...createComentarioDto });
  }

  async findAll(): Promise<Comentario[]> {
    return await this.comentarioModel.findAll({
      include: [User, Pregunta],
    });
  }

  async findOne(id: number): Promise<Comentario> {
    const comentario = await this.comentarioModel.findByPk(id);
    if (!comentario) {
      throw new NotFoundException(`Comentario with id ${id} not found`);
    }
    return comentario;
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const comentario = await this.findOne(id);
    await comentario.update({ ...updateComentarioDto });
    return comentario;
  }

  async remove(id: number): Promise<void> {
    const comentario = await this.findOne(id);
    await comentario.destroy();
  }

  // nuevos endpoint para comentarios
  async findByPreguntaId(idPregunta: number): Promise<Comentario[]> {
    return await this.comentarioModel.findAll({
      where: {
        id_pregunta: idPregunta
      },
      order: [['fecha_comentario', 'DESC']] // Ordenamos por fecha, más recientes primero
    });
  }
  
  async createForPregunta(idPregunta: number, createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    return await this.comentarioModel.create({ 
      ...createComentarioDto,
      id_pregunta: idPregunta
    });
  }
}
