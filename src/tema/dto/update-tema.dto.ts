
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateTemaDto {
  @IsOptional()
  @IsString()
  readonly nombre_tema?: string;

  @IsOptional()
  @IsInt()
  readonly id_modulo?: number;
}