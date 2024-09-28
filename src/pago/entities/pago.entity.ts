
import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Subscripcion } from 'src/subscripcion/entities/subscripcion.entity';


@Table
export class Pago extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_pago: number;

  @ForeignKey(() => Subscripcion)
  @Column
  id_subscription: number;

  @Column
  monto: number;

  @Column
  fecha_pago: Date;

  @Column
  estado: string;  // Pagado o no pagado
  
  @BelongsTo(() => Subscripcion)
  subscription: Subscripcion;
}
