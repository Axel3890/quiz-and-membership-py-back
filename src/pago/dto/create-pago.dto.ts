
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreatePagoDto {
  @IsNotEmpty()
  id_subscription: number;

  @IsNumber()
  monto: number;

  @IsDateString()
  fecha_pago: Date;

  @IsString()
  estado: string;
}
