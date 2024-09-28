import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table
export class Subscripcion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_subscripcion: number;  // Clave primaria autoincrementable

  @ForeignKey(() => User)
  @Column
  id_user: number;

  @Column
  fecha_inicio: Date;

  @Column
  fecha_fin: Date;

  @Column
  estado: string;

  @Column
  tipo_suscripcion: string;

  @Column
  metodo_pago: string;

  // Relación N:1 con User
  @BelongsTo(() => User)
  user: User;
}
