import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Tema } from '../../tema/entities/tema.entity';

@Table
export class Modulo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_modulo: number;

  @Column
  nombre_modulo: string;

  @Column
  imagen: string;

  @HasMany(() => Tema)
  temas: Tema[];
}
