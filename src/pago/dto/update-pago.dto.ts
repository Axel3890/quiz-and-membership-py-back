
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdatePagoDto {
  @IsOptional()
  id_subscription?: number;

  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsDateString()
  fecha_pago?: Date;

  @IsOptional()
  @IsString()
  estado?: string;
}

