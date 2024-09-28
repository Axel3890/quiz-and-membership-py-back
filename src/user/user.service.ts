import { Injectable, Inject } from '@nestjs/common';
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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 

    return this.userRepository.create({
      username: createUserDto.username,
      nombre: createUserDto.nombre,
      apellido: createUserDto.apellido,
      email: createUserDto.email,
      password: hashedPassword,  
      role: createUserDto.role,
      fecha_registro: new Date(),
    });
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }


  async findOne(id_user: number): Promise<User> {
    return this.userRepository.findByPk(id_user);
  }


  async update(id_user: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]> {
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

    return this.userRepository.update(updateData, {
      where: { id_user },
      returning: true,
    });
  }

  async remove(id_user: number): Promise<void> {
    const user = await this.userRepository.findByPk(id_user);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    await user.destroy();
  }


  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }
}

