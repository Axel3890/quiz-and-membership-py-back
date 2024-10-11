import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email o contraseña incorrecta');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email o contraseña incorrecta');
    }

    // Si las credenciales son correctas, devolvemos al usuario
    return user;
  }

  // Método para registrar nuevos usuarios
  async register(registerDto: any): Promise<any> {
    const userExists = await this.userService.findOneByEmail(registerDto.email);

    if (userExists) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    return await this.userService.create(registerDto);
  }
}