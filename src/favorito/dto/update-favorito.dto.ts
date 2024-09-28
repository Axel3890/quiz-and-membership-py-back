
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateFavoritoDto {
  @IsOptional()
  id_user?: number;

  @IsOptional()
  id_pregunta?: number;

  @IsOptional()
  @IsDateString()
  fecha_agregado?: Date;
}
