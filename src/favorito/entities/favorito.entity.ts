import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Pregunta } from '../../pregunta/entities/pregunta.entity';

@Table
export class Favorito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_favorito: number;

  @ForeignKey(() => User)
  @Column
  id_user: number;

  @ForeignKey(() => Pregunta)
  @Column
  id_pregunta: number;

  @Column
  fecha_agregado: Date;

  // Relación N:1 con User
  @BelongsTo(() => User)
  user: User;

  // Relación N:1 con Pregunta
  @BelongsTo(() => Pregunta, { onDelete: 'CASCADE' }) // Eliminar en cascada cuando se borra una pregunta
  pregunta: Pregunta;
}