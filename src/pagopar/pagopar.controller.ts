import { Controller, Post, Inject, Body, HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';
import { User } from "../user/entities/user.entity";

@Controller('pagopar-subscription')
export class PagoparSubscriptionController {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User, // Inyección correcta
  ) {}

  @Post('callback')
  async handleSubscriptionCallback(@Body() notificationData: any) {
    const privateKey = process.env.PAGOPAR_PRIVATE_KEY;
    const generatedToken = createHash('sha1')
      .update(privateKey + notificationData.tipo_accion)
      .digest('hex');

    if (generatedToken !== notificationData.token) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const userIdentifier = notificationData.usuario.token_identificador;
    const user = await this.userRepository.findOne({ where: { id_user: userIdentifier } });

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

