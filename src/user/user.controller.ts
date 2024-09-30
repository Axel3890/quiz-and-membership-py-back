import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente',
        data: user,
      };
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
      throw new HttpException(error.message || 'Error al crear el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuarios recuperados exitosamente',
        data: users,
      };
    } catch (error) {
      console.error('Error al recuperar los usuarios:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        console.error('Usuario no encontrado');
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario recuperado exitosamente',
        data: user,
      };
    } catch (error) {
      console.error('Error al recuperar el usuario:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const [numberOfAffectedRows, [updatedUser]] = await this.userService.update(+id, updateUserDto);
      if (numberOfAffectedRows === 0) {
        console.error('Usuario no encontrado o sin cambios');
        throw new HttpException('Usuario no encontrado o sin cambios', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser,
      };
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Usuario eliminado exitosamente',
      };
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

