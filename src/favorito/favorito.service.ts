import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { Favorito } from './entities/favorito.entity';

@Injectable()
export class FavoritoService {
  constructor(
    @Inject('FAVORITO_REPOSITORY')
    private readonly favoritoRepository: typeof Favorito,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto): Promise<Favorito> {
    try {
      return await this.favoritoRepository.create({
        id_user: createFavoritoDto.id_user,
        id_pregunta: createFavoritoDto.id_pregunta,
        fecha_agregado: createFavoritoDto.fecha_agregado,
      });
    } catch (error) {
      console.error('Error al crear el favorito:', error.message);
      throw new HttpException(error.message || 'Error al crear el favorito', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Favorito[]> {
    try {
      return await this.favoritoRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los favoritos:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los favoritos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id_favorito: number): Promise<Favorito> {
    try {
      const favorito = await this.favoritoRepository.findByPk(id_favorito);
      if (!favorito) {
        console.error('Favorito no encontrado');
        throw new HttpException('Favorito no encontrado', HttpStatus.NOT_FOUND);
      }
      return favorito;
    } catch (error) {
      console.error('Error al recuperar el favorito:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el favorito', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_favorito: number, updateFavoritoDto: UpdateFavoritoDto): Promise<[number, Favorito[]]> {
    try {
      return await this.favoritoRepository.update(
        {
          id_user: updateFavoritoDto.id_user,
          id_pregunta: updateFavoritoDto.id_pregunta,
          fecha_agregado: updateFavoritoDto.fecha_agregado,
        },
        {
          where: { id_favorito },
          returning: true,
        },
      );
    } catch (error) {
      console.error('Error al actualizar el favorito:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el favorito', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_favorito: number): Promise<void> {
    try {
      const favorito = await this.favoritoRepository.findByPk(id_favorito);
      if (!favorito) {
        console.error('Favorito no encontrado');
        throw new HttpException('Favorito no encontrado', HttpStatus.NOT_FOUND);
      }
      await favorito.destroy();
    } catch (error) {
      console.error('Error al eliminar el favorito:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el favorito', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

