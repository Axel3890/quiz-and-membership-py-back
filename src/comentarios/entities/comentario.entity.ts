import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, CreatedAt } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';

@Table
export class Comentario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_comentario: number;

  @ForeignKey(() => Pregunta)
  @Column
  id_pregunta: number;

  @ForeignKey(() => User)
  @Column
  id_user: number;

  @Column
  texto_comentario: string;

  @CreatedAt
  @Column
  fecha_comentario: Date;

  // Relación N:1 con User
  @BelongsTo(() => User)
  user: User;

  // Relación N:1 con Pregunta
  @BelongsTo(() => Pregunta, { onDelete: 'CASCADE' })
  pregunta: Pregunta;
}
