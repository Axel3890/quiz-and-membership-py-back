// src/pregunta/dto/filter-preguntas.dto.ts
import { IsArray, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class FilterPreguntasDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  filterTemas: number[];

  @IsArray()
  @IsNotEmpty({ each: true })
  filterSubtemas: number[];

  @IsInt()
  @IsOptional()
  yearPregunta?: number;
}
