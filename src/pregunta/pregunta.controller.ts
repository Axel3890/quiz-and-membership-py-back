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
      console.error('Error al crear la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al crear la pregunta', HttpStatus.BAD_REQUEST);
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
      console.error('Error al recuperar las preguntas:', error.message);
      throw new HttpException(error.message || 'Error al recuperar las preguntas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const pregunta = await this.preguntaService.findOne(+id);
      if (!pregunta) {
        console.error('Pregunta no encontrada');
        throw new HttpException('Pregunta no encontrada', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Pregunta recuperada exitosamente',
        data: pregunta,
      };
    } catch (error) {
      console.error('Error al recuperar la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al recuperar la pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    try {
      const [numberOfAffectedRows, [updatedPregunta]] = await this.preguntaService.update(+id, updatePreguntaDto);
      if (numberOfAffectedRows === 0) {
        console.error('Pregunta no encontrada o sin cambios');
        throw new HttpException('Pregunta no encontrada o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Pregunta actualizada exitosamente',
        data: updatedPregunta,
      };
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al actualizar la pregunta', HttpStatus.BAD_REQUEST);
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
      console.error('Error al eliminar la pregunta:', error.message);
      throw new HttpException(error.message || 'Error al eliminar la pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}

