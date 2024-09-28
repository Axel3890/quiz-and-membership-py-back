
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateSubscripcionDto {
  @IsOptional()
  id_user?: number;

  @IsOptional()
  @IsDateString()
  fecha_inicio?: Date;

  @IsOptional()
  @IsDateString()
  fecha_fin?: Date;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  tipo_suscripcion?: string;

  @IsOptional()
  @IsString()
  metodo_pago?: string;
}
