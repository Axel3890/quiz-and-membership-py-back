
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Tema extends Model {
  @Column
  nombre: string;

  @Column
  descripcion: string;
}
