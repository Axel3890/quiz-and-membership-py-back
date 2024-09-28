
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuloDto {
  @IsNotEmpty()  
  @IsString()   
  readonly nombre_modulo: string;

  @IsString()
  readonly imagen: string;
}
  
