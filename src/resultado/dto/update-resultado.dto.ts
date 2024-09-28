
import { IsOptional, IsBoolean, IsDateString, IsString } from 'class-validator';

export class UpdateResultadoDto {
  @IsOptional()
  id_user?: number;

  @IsOptional()
  id_pregunta?: number;

  @IsOptional()
  @IsString()
  respuesta_dada?: string;

  @IsOptional()
  @IsBoolean()
  es_correcta?: boolean;

  @IsOptional()
  @IsDateString()
  fecha_respuesta?: Date;
}
