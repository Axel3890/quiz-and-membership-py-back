import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  is_approved?: boolean;

  @IsOptional()
  @IsBoolean()
  is_user_active: boolean; 
  
  @IsOptional()
  @IsString()
  carrera?: string;

  @IsOptional()
  @IsString()
  avatar_img?: string;

  @IsOptional()
  @IsString()
  facultad?: string; 
}
