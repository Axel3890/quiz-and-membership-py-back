
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateFavoritoDto {
  @IsNotEmpty()
  id_user: number;

  @IsNotEmpty()
  id_pregunta: number;

  @IsDateString()
  fecha_agregado: Date;
}
