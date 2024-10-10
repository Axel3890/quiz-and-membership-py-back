import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Subtema } from '../../subtema/entities/subtema.entity';
import { Resultado } from '../../resultado/entities/resultado.entity';
import { Favorito } from '../../favorito/entities/favorito.entity';

@Table
export class Pregunta extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id_pregunta: number;

  @ForeignKey(() => Subtema)
  @Column
  id_subtema: number;

  @Column
  year: number;

  @Column
  texto_pregunta: string;

  @Column
  explicacion_correcta: string;

  @Column
  explicacion_incorrecta: string;

  @Column
  imagen_video: string;

  // Relación N:1 con Subtema
  @BelongsTo(() => Subtema)
  subtema: Subtema;

  // Relación 1:N con Resultado
  @HasMany(() => Resultado)
  resultados: Resultado[];

  // Relación 1:N con Favorito
  @HasMany(() => Favorito)
  favoritos: Favorito[];
}
