import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Controller('modulo')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createModuloDto: CreateModuloDto) {
    try {
      const modulo = await this.moduloService.create(createModuloDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Módulo creado exitosamente',
        data: modulo,
      };
    } catch (error) {
      console.error('Error al crear el módulo:', error.message);
      throw new HttpException(error.message || 'Error al crear el módulo', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const modulos = await this.moduloService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Módulos recuperados exitosamente',
        data: modulos,
      };
    } catch (error) {
      console.error('Error al recuperar los módulos:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los módulos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const modulo = await this.moduloService.findOne(+id);
      if (!modulo) {
        console.error('Módulo no encontrado');
        throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Módulo recuperado exitosamente',
        data: modulo,
      };
    } catch (error) {
      console.error('Error al recuperar el módulo:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el módulo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    try {
      const [numberOfAffectedRows, [updatedModulo]] = await this.moduloService.update(+id, updateModuloDto);
      if (numberOfAffectedRows === 0) {
        console.error('Módulo no encontrado o sin cambios');
        throw new HttpException('Módulo no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Módulo actualizado exitosamente',
        data: updatedModulo,
      };
    } catch (error) {
      console.error('Error al actualizar el módulo:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el módulo', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.moduloService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Módulo eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el módulo:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el módulo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
