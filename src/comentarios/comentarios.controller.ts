import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    try {
      const comentario = await this.comentariosService.create(createComentarioDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Comentario creado exitosamente',
        data: comentario,
      };
    } catch (error) {
      console.error('Error al crear el comentario:', error.message);
      throw new HttpException(error.message || 'Error al crear el comentario', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const comentarios = await this.comentariosService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Comentarios recuperados exitosamente',
        data: comentarios,
      };
    } catch (error) {
      console.error('Error al recuperar los comentarios:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los comentarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const comentario = await this.comentariosService.findOne(+id);
      if (!comentario) {
        console.error('Comentario no encontrado');
        throw new HttpException('Comentario no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Comentario recuperado exitosamente',
        data: comentario,
      };
    } catch (error) {
      console.error('Error al recuperar el comentario:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el comentario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    try {
      const comentario = await this.comentariosService.update(+id, updateComentarioDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Comentario actualizado exitosamente',
        data: comentario,
      };
    } catch (error) {
      console.error('Error al actualizar el comentario:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el comentario', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.comentariosService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Comentario eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el comentario:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el comentario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
