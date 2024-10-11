import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // Importar UserModule si AuthService depende de UserService

@Module({
  imports: [UserModule], // Aquí aseguramos que el UserModule esté disponible si AuthService lo necesita
  providers: [AuthService], // Registramos AuthService como proveedor
  controllers: [AuthController], // Registramos AuthController como controlador
  exports: [AuthService], // Exportamos AuthService si otros módulos lo necesitan
})
export class AuthModule {}
