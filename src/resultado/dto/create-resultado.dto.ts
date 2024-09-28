// src/resultado/dto/create-resultado.dto.ts
import { IsNotEmpty, IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateResultadoDto {
  @IsNotEmpty()
  id_user: number;

  @IsNotEmpty()
  id_pregunta: number;

  @IsString()
  respuesta_dada: string;

  @IsBoolean()
  es_correcta: boolean;

  @IsDateString()
  fecha_respuesta: Date;
}
