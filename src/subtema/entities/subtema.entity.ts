import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Tema } from '../../tema/entities/tema.entity';

@Table
export class Subtema extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_subtema: number;

  @Column
  nombre_subtema: string;

  @ForeignKey(() => Tema)
  @Column
  id_tema: number;

  @BelongsTo(() => Tema)
  tema: Tema;
}
