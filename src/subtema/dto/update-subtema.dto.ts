import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateSubtemaDto {
  @IsOptional()
  @IsString()
  readonly nombre_subtema?: string;

  @IsOptional()
  @IsInt()
  readonly id_tema?: number;
}