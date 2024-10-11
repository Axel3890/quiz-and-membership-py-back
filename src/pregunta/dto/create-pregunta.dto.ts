
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePreguntaDto {
  @IsNotEmpty()
  id_subtema: number;

  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  texto_pregunta: string;

  @IsString()
  explicacion_correcta: string;

  @IsString()
  explicacion_incorrecta: string;

  @IsString()
  imagen_video?: string;
}
