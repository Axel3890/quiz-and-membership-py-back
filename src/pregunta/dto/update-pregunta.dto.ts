
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePreguntaDto {
  @IsOptional()
  id_subtema?: number;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  texto_pregunta?: string;
}

