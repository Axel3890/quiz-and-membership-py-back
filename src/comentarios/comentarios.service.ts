import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from "./entities/comentario.entity"

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
    return await this.comentarioModel.findAll();
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
}
