import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { TemaService } from './tema.service';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

@Controller('tema')
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTemaDto: CreateTemaDto) {
    try {
      const tema = await this.temaService.create(createTemaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tema creado exitosamente',
        data: tema,
      };
    } catch (error) {
      console.error('Error al crear el tema:', error.message);
      throw new HttpException(error.message || 'Error al crear el tema', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const temas = await this.temaService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Temas recuperados exitosamente',
        data: temas,
      };
    } catch (error) {
      console.error('Error al recuperar los temas:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los temas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const tema = await this.temaService.findOne(+id);
      if (!tema) {
        console.error('Tema no encontrado');
        throw new HttpException('Tema no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tema recuperado exitosamente',
        data: tema,
      };
    } catch (error) {
      console.error('Error al recuperar el tema:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateTemaDto: UpdateTemaDto) {
    try {
      const [numberOfAffectedRows, [updatedTema]] = await this.temaService.update(+id, updateTemaDto);
      if (numberOfAffectedRows === 0) {
        console.error('Tema no encontrado o sin cambios');
        throw new HttpException('Tema no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tema actualizado exitosamente',
        data: updatedTema,
      };
    } catch (error) {
      console.error('Error al actualizar el tema:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el tema', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.temaService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Tema eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el tema:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
