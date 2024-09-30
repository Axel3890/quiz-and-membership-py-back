import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';

@Controller('favorito')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createFavoritoDto: CreateFavoritoDto) {
    try {
      const favorito = await this.favoritoService.create(createFavoritoDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Favorito creado exitosamente',
        data: favorito,
      };
    } catch (error) {
      console.error('Error al crear el favorito:', error.message);
      throw new HttpException(error.message || 'Error al crear el favorito', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const favoritos = await this.favoritoService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Favoritos recuperados exitosamente',
        data: favoritos,
      };
    } catch (error) {
      console.error('Error al recuperar los favoritos:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los favoritos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const favorito = await this.favoritoService.findOne(+id);
      if (!favorito) {
        console.error('Favorito no encontrado');
        throw new HttpException('Favorito no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Favorito recuperado exitosamente',
        data: favorito,
      };
    } catch (error) {
      console.error('Error al recuperar el favorito:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el favorito', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateFavoritoDto: UpdateFavoritoDto) {
    try {
      const [numberOfAffectedRows, [updatedFavorito]] = await this.favoritoService.update(+id, updateFavoritoDto);
      if (numberOfAffectedRows === 0) {
        console.error('Favorito no encontrado o sin cambios');
        throw new HttpException('Favorito no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Favorito actualizado exitosamente',
        data: updatedFavorito,
      };
    } catch (error) {
      console.error('Error al actualizar el favorito:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el favorito', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.favoritoService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Favorito eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el favorito:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el favorito', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

