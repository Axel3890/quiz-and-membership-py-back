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
      throw new HttpException('Error al crear la opción', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Error al recuperar las opciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const opcion = await this.opcionService.findOne(+id);
      if (!opcion) {
        throw new HttpException('Opción no encontrada', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Opción recuperada exitosamente',
        data: opcion,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar la opción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateOpcionDto: UpdateOpcionDto) {
    try {
      const [numberOfAffectedRows, [updatedOpcion]] = await this.opcionService.update(+id, updateOpcionDto);
      if (numberOfAffectedRows === 0) {
        throw new HttpException('Opción no encontrada o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Opción actualizada exitosamente',
        data: updatedOpcion,
      };
    } catch (error) {
      throw new HttpException('Error al actualizar la opción', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Error al eliminar la opción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
