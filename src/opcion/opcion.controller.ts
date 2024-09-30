import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { OpcionService } from './opcion.service';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { UpdateOpcionDto } from './dto/update-opcion.dto';

@Controller('opcion')
export class OpcionController {
  constructor(private readonly opcionService: OpcionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createOpcionDto: CreateOpcionDto) {
    try {
      const opcion = await this.opcionService.create(createOpcionDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Opción creada exitosamente',
        data: opcion,
      };
    } catch (error) {
      console.error('Error al crear la opción:', error.message);
      throw new HttpException(error.message || 'Error al crear la opción', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const opciones = await this.opcionService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Opciones recuperadas exitosamente',
        data: opciones,
      };
    } catch (error) {
      console.error('Error al recuperar las opciones:', error.message);
      throw new HttpException(error.message || 'Error al recuperar las opciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const opcion = await this.opcionService.findOne(+id);
      if (!opcion) {
        console.error('Opción no encontrada');
        throw new HttpException('Opción no encontrada', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Opción recuperada exitosamente',
        data: opcion,
      };
    } catch (error) {
      console.error('Error al recuperar la opción:', error.message);
      throw new HttpException(error.message || 'Error al recuperar la opción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateOpcionDto: UpdateOpcionDto) {
    try {
      const [numberOfAffectedRows, [updatedOpcion]] = await this.opcionService.update(+id, updateOpcionDto);
      if (numberOfAffectedRows === 0) {
        console.error('Opción no encontrada o sin cambios');
        throw new HttpException('Opción no encontrada o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Opción actualizada exitosamente',
        data: updatedOpcion,
      };
    } catch (error) {
      console.error('Error al actualizar la opción:', error.message);
      throw new HttpException(error.message || 'Error al actualizar la opción', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.opcionService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Opción eliminada exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar la opción:', error.message);
      throw new HttpException(error.message || 'Error al eliminar la opción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
