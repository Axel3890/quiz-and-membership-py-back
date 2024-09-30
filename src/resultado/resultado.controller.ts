import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ResultadoService } from './resultado.service';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';

@Controller('resultado')
export class ResultadoController {
  constructor(private readonly resultadoService: ResultadoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createResultadoDto: CreateResultadoDto) {
    try {
      const resultado = await this.resultadoService.create(createResultadoDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Resultado creado exitosamente',
        data: resultado,
      };
    } catch (error) {
      console.error('Error al crear el resultado:', error.message);
      throw new HttpException(error.message || 'Error al crear el resultado', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const resultados = await this.resultadoService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Resultados recuperados exitosamente',
        data: resultados,
      };
    } catch (error) {
      console.error('Error al recuperar los resultados:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los resultados', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const resultado = await this.resultadoService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Resultado recuperado exitosamente',
        data: resultado,
      };
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
        console.error('Error: Resultado no encontrado', error.message);
        throw new HttpException(error.message || 'Resultado no encontrado', HttpStatus.NOT_FOUND);
      }
      console.error('Error al recuperar el resultado:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateResultadoDto: UpdateResultadoDto) {
    try {
      const [numberOfAffectedRows, [updatedResultado]] = await this.resultadoService.update(+id, updateResultadoDto);
      if (numberOfAffectedRows === 0) {
        console.error('Error: Resultado no encontrado o sin cambios');
        throw new HttpException('Resultado no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Resultado actualizado exitosamente',
        data: updatedResultado,
      };
    } catch (error) {
      console.error('Error al actualizar el resultado:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el resultado', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.resultadoService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Resultado eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el resultado:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
