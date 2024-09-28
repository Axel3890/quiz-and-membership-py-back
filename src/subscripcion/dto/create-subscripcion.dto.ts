
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSubscripcionDto {
  @IsNotEmpty()
  id_user: number;

  @IsDateString()
  fecha_inicio: Date;

  @IsDateString()
  fecha_fin: Date;

  @IsString()
  estado: string;

  @IsString()
  tipo_suscripcion: string;

  @IsString()
  metodo_pago: string;
}

