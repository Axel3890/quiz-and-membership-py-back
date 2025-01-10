import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Plan extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_Plan: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tipo_plan: string;

  @Column({
    type: DataType.TEXT, 
    allowNull: false,
  })
  descripcion: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_inicio: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  fecha_fin: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  precio: number;
}
