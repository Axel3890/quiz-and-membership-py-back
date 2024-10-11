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

}
