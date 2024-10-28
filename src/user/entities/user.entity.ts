import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Resultado } from '../../resultado/entities/resultado.entity';
import { Favorito } from '../../favorito/entities/favorito.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_user: number;  // Clave primaria autoincrementable

  @Column
  username: string;

  @Column
  nombre: string;

  @Column
  apellido: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  fecha_registro: Date;

  @Column({ allowNull: true })
  avatar_img?: string;

  @Column({ allowNull: true })
  is_user_active?: boolean;


  @Column({ allowNull: true })
  is_approved: boolean;

  @Column({ allowNull: true })
  carrera?: string;


  @Column({ allowNull: true })
  facultad?: string;

  // Relación 1:N con Resultado
  @HasMany(() => Resultado)
  resultados: Resultado[];

  // Relación 1:N con Favorito
  @HasMany(() => Favorito)
  favoritos: Favorito[];
}
