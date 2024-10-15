import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  @IsBoolean()
  is_approved: boolean; 

  @IsOptional()
  @IsString()
  carrera?: string;     

  @IsOptional()
  @IsString()
  facultad?: string;     
}
