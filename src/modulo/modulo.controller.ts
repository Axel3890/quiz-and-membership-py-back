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
      throw new HttpException('Error al crear el módulo', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Error al recuperar los módulos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const modulo = await this.moduloService.findOne(+id);
      if (!modulo) {
        throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Módulo recuperado exitosamente',
        data: modulo,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar el módulo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    try {
      const [numberOfAffectedRows, [updatedModulo]] = await this.moduloService.update(+id, updateModuloDto);
      if (numberOfAffectedRows === 0) {
        throw new HttpException('Módulo no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Módulo actualizado exitosamente',
        data: updatedModulo,
      };
    } catch (error) {
      throw new HttpException('Error al actualizar el módulo', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Error al eliminar el módulo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
