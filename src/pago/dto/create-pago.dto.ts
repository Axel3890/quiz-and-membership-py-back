import { IsNumber, IsPositive, IsString, IsOptional, IsDate, IsEnum } from 'class-validator';

export class CreatePagoDto {
  @IsNumber()
  @IsPositive()
  id_User: number;

  @IsNumber()
  @IsPositive()
  id_Plan: number;

  @IsNumber()
  @IsPositive()
  monto: number;

  @IsString()
  fecha_pago: string;

  @IsString()
  metodo_pago: string; // Ejemplo: "tarjeta", "transferencia", etc.

  @IsString()
  estado: string; // Ejemplo: "pendiente", "completado", etc.

  @IsString()
  @IsOptional()
  comprobante?: string; // Comprobante opcional
}
