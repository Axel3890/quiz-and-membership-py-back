import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Tema } from '../../tema/entities/tema.entity';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';
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

  // Relación 1:N con Pregunta con eliminación en cascada
  @HasMany(() => Pregunta, { onDelete: 'CASCADE' }) 
  preguntas: Pregunta[];
}
