import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Plan } from '../../plan/entities/plan.entity';
import { User } from '../../user/entities/user.entity';

@Table
export class Pago extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_Pago: number;

  @ForeignKey(() => User)
  @Column
  id_User: number;

  @ForeignKey(() => Plan)
  @Column
  id_Plan: number;

  @Column({
    type: DataType.DECIMAL(10, 2), // Permite almacenar decimales con precisión
    allowNull: false,
  })
  monto: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_pago: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  metodo_pago: string; // Ejemplo: "tarjeta", "transferencia", etc.

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  estado: string; // Ejemplo: "pendiente", "completado", etc.

  @Column({
    type: DataType.STRING,
    allowNull: true, // Opcional
  })
  comprobante: string;

  @BelongsTo(() => User)
  usuario: User;

  @BelongsTo(() => Plan)
  plan: Plan;
}
