import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Modulo } from '../../modulo/entities/modulo.entity';
import { Subtema } from '../../subtema/entities/subtema.entity';

@Table
export class Tema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_tema: number;

  @Column
  nombre_tema: string;

  @ForeignKey(() => Modulo)
  @Column
  id_modulo: number;

  @BelongsTo(() => Modulo)
  modulo: Modulo;

  @HasMany(() => Subtema, { onDelete: 'CASCADE' }) // Aquí aplicamos el onDelete: 'CASCADE'
  subtemas: Subtema[];
}

