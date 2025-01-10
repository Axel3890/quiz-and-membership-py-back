import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  
  @IsString()
  tpo_plan: string;


  @IsDateString()
  fecha_inicio: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string;

  @IsNumber()
  precio: number;
}

