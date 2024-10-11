import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string, password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return { message: 'Login exitoso', user };
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    const newUser = await this.authService.register(registerDto);
    return { message: 'Usuario registrado exitosamente', newUser };
  }
}
