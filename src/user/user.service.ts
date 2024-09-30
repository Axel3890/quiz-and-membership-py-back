import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      return await this.userRepository.create({
        username: createUserDto.username,
        nombre: createUserDto.nombre,
        apellido: createUserDto.apellido,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
        fecha_registro: new Date(),
      });
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
      throw new HttpException(error.message || 'Error al crear el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      console.error('Error al recuperar los usuarios:', error.message);
      throw new HttpException(error.message || 'Error al recuperar los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id_user: number): Promise<User> {
    try {
      const user = await this.userRepository.findByPk(id_user);
      if (!user) {
        console.error('Usuario no encontrado');
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.error('Error al recuperar el usuario:', error.message);
      throw new HttpException(error.message || 'Error al recuperar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id_user: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]> {
    try {
      const updateData: Partial<User> = {
        username: updateUserDto.username,
        nombre: updateUserDto.nombre,
        apellido: updateUserDto.apellido,
        email: updateUserDto.email,
        role: updateUserDto.role,
      };

      if (updateUserDto.password) {
        updateData.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      return await this.userRepository.update(updateData, {
        where: { id_user },
        returning: true,
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      throw new HttpException(error.message || 'Error al actualizar el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id_user: number): Promise<void> {
    try {
      const user = await this.userRepository.findByPk(id_user);
      if (!user) {
        console.error('Usuario no encontrado');
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      await user.destroy();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      throw new HttpException(error.message || 'Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        console.error('Usuario no encontrado');
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      return isPasswordValid;
    } catch (error) {
      console.error('Error al validar la contraseña:', error.message);
      throw new HttpException(error.message || 'Error al validar la contraseña', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

