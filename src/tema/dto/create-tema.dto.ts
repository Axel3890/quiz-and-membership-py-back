import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTemaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre_tema: string;

  @IsNotEmpty()
  @IsInt()  // Validación para asegurarse de que es un número entero
  readonly id_modulo: number;
}