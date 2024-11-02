import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';
import { User } from "../user/entities/user.entity";
import { InjectModel } from '@nestjs/sequelize';

@Controller('pagopar-subscription')
export class PagoparSubscriptionController {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User
  ) {}

  @Post('callback')
  async handleSubscriptionCallback(@Body() notificationData: any) {
    const privateKey = process.env.PAGOPAR_PRIVATE_KEY;
    const generatedToken = createHash('sha1')
      .update(privateKey + notificationData.tipo_accion)
      .digest('hex');

    // Validar el token de seguridad
    if (generatedToken !== notificationData.token) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    // Obtener datos del usuario desde la notificación
    const userIdentifier = notificationData.usuario.token_identificador; // ID del usuario (ajustar si se usa otro campo único)
    const user = await this.userModel.findOne({ where: { id_user: userIdentifier } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Cambiar el estado de suscripción según el tipo de acción
    switch (notificationData.tipo_accion) {
      case 'suscripcion':
        user.estado_suscripcion = 'pendiente';
        break;
      case 'pagado':
        user.estado_suscripcion = 'activa';
        break;
      case 'desuscripcion':
        user.estado_suscripcion = 'cancelada';
        break;
      default:
        throw new HttpException('Unknown action type', HttpStatus.BAD_REQUEST);
    }

    await user.save();

    // Retornar exactamente el mismo JSON recibido
    return notificationData;
  }
}
