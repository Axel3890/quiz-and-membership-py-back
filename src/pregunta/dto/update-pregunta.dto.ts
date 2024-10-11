
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

