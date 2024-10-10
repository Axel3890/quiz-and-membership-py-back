import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';

@Table
export class Opcion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_opcion: number;

  @ForeignKey(() => Pregunta)
  @Column
  id_pregunta: number;

  @Column
  texto_opcion: string;

  @Column
  es_correcta: boolean;
  
  @BelongsTo(() => Pregunta)
  pregunta: Pregunta;
}

