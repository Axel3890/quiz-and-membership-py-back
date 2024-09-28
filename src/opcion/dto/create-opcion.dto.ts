// src/opcion/dto/create-opcion.dto.ts
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateOpcionDto {
  @IsNotEmpty()
  id_pregunta: number;

  @IsString()
  texto_opcion: string;

  @IsBoolean()
  es_correcta: boolean;

  @IsString()
  explicacion_correcta: string;

  @IsString()
  explicacion_incorrecta: string;

  @IsString()
  imagen_video?: string;
}
