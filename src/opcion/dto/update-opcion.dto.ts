// src/opcion/dto/update-opcion.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateOpcionDto {
  @IsOptional()
  id_pregunta?: number;

  @IsOptional()
  @IsString()
  texto_opcion?: string;

  @IsOptional()
  @IsBoolean()
  es_correcta?: boolean;

  @IsOptional()
  @IsString()
  explicacion_correcta?: string;

  @IsOptional()
  @IsString()
  explicacion_incorrecta?: string;

  @IsOptional()
  @IsString()
  imagen_video?: string;
}
