import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty()
  @IsNumber()
  id_pregunta: number;

  @IsNotEmpty()
  @IsNumber()
  id_user: number;

  @IsNotEmpty()
  @IsString()
  texto_comentario: string;
}
