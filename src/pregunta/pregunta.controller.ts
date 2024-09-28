import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Controller('pregunta')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntaService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPreguntaDto: CreatePreguntaDto) {
    try {
      const pregunta = await this.preguntaService.create(createPreguntaDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Pregunta creada exitosamente',
        data: pregunta,
      };
    } catch (error) {
      throw new HttpException('Error al crear la pregunta', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const preguntas = await this.preguntaService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Preguntas recuperadas exitosamente',
        data: preguntas,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar las preguntas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const pregunta = await this.preguntaService.findOne(+id);
      if (!pregunta) {
        throw new HttpException('Pregunta no encontrada', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Pregunta recuperada exitosamente',
        data: pregunta,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar la pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    try {
      const [numberOfAffectedRows, [updatedPregunta]] = await this.preguntaService.update(+id, updatePreguntaDto);
      if (numberOfAffectedRows === 0) {
        throw new HttpException('Pregunta no encontrada o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Pregunta actualizada exitosamente',
        data: updatedPregunta,
      };
    } catch (error) {
      throw new HttpException('Error al actualizar la pregunta', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.preguntaService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Pregunta eliminada exitosamente',
      };
    } catch (error) {
      throw new HttpException('Error al eliminar la pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
