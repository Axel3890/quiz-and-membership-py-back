import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateSubtemaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre_subtema: string;

  @IsNotEmpty()
  @IsInt()
  readonly id_tema: number;
}