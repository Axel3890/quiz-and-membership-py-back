import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPagoDto: CreatePagoDto) {
    try {
      const pago = await this.pagoService.create(createPagoDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Pago creado exitosamente',
        data: pago,
      };
    } catch (error) {
      throw new HttpException('Error al crear el pago', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const pagos = await this.pagoService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Pagos recuperados exitosamente',
        data: pagos,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar los pagos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const pago = await this.pagoService.findOne(+id);
      if (!pago) {
        throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Pago recuperado exitosamente',
        data: pago,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    try {
      const [numberOfAffectedRows, [updatedPago]] = await this.pagoService.update(+id, updatePagoDto);
      if (numberOfAffectedRows === 0) {
        throw new HttpException('Pago no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Pago actualizado exitosamente',
        data: updatedPago,
      };
    } catch (error) {
      throw new HttpException('Error al actualizar el pago', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.pagoService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Pago eliminado exitosamente',
      };
    } catch (error) {
      throw new HttpException('Error al eliminar el pago', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

