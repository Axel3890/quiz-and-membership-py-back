import { IsOptional, IsString } from 'class-validator';

export class UpdateModuloDto {
  @IsOptional()  // Este campo es opcional en el update
  @IsString()
  readonly nombre_modulo?: string;

  @IsOptional()  // Este campo es opcional en el update
  @IsString()
  readonly imagen?: string;
}