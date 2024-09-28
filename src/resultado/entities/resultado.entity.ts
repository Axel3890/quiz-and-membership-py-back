import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';

@Table
export class Resultado extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_resultado: number;  // Clave primaria autoincrementable

  @ForeignKey(() => User)
  @Column
  id_user: number;

  @ForeignKey(() => Pregunta)
  @Column
  id_pregunta: number;

  @Column
  respuesta_dada: string;

  @Column
  es_correcta: boolean;

  @Column
  fecha_respuesta: Date;

  // Relación N:1 con User
  @BelongsTo(() => User)
  user: User;

  // Relación N:1 con Pregunta
  @BelongsTo(() => Pregunta)
  pregunta: Pregunta;
}

