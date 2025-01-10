import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
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
      console.error('Error al crear el pago:', error.message);
      throw new HttpException(
        error.message || 'Error al crear el pago',
        HttpStatus.BAD_REQUEST,
      );
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
      console.error('Error al recuperar los pagos:', error.message);
      throw new HttpException(
        error.message || 'Error al recuperar los pagos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const pago = await this.pagoService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: `Pago con ID ${id} recuperado exitosamente`,
        data: pago,
      };
    } catch (error) {
      console.error(`Error al recuperar el pago con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al recuperar el pago con ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePagoDto: UpdatePagoDto,
  ) {
    try {
      const pagoActualizado = await this.pagoService.update(+id, updatePagoDto);
      return {
        statusCode: HttpStatus.OK,
        message: `Pago con ID ${id} actualizado exitosamente`,
        data: pagoActualizado,
      };
    } catch (error) {
      console.error(`Error al actualizar el pago con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al actualizar el pago con ID ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const resultado = await this.pagoService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: resultado.message,
      };
    } catch (error) {
      console.error(`Error al eliminar el pago con ID ${id}:`, error.message);
      throw new HttpException(
        error.message || `Error al eliminar el pago con ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
