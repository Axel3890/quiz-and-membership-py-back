import { Injectable, Inject } from '@nestjs/common';
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
    return this.favoritoRepository.create({
      id_user: createFavoritoDto.id_user,
      id_pregunta: createFavoritoDto.id_pregunta,
      fecha_agregado: createFavoritoDto.fecha_agregado,
    });
  }

  async findAll(): Promise<Favorito[]> {
    return this.favoritoRepository.findAll();
  }

  async findOne(id_favorito: number): Promise<Favorito> {
    return this.favoritoRepository.findByPk(id_favorito);
  }

  async update(id_favorito: number, updateFavoritoDto: UpdateFavoritoDto): Promise<[number, Favorito[]]> {
    return this.favoritoRepository.update(
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
  }

  async remove(id_favorito: number): Promise<void> {
    const favorito = await this.favoritoRepository.findByPk(id_favorito);
    if (!favorito) {
      throw new Error('Favorito no encontrado');
    }
    await favorito.destroy();
  }
}
