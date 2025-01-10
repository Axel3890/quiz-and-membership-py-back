import { Table, Column, Model, ForeignKey, HasMany, BelongsTo, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Subtema } from '../../subtema/entities/subtema.entity';
import { Resultado } from '../../resultado/entities/resultado.entity';
import { Favorito } from '../../favorito/entities/favorito.entity';
import { Opcion } from 'src/opcion/entities/opcion.entity';

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

  @Column(DataType.TEXT)
  texto_pregunta: string;
  
  @Column(DataType.TEXT)
  explicacion_correcta: string;

  @Column(DataType.TEXT)
  explicacion_incorrecta: string;

  @Column
  imagen_video: string;

  @HasMany(() => Opcion)
  opciones: Opcion[];

  @BelongsTo(() => Subtema)
  subtema: Subtema;

  @HasMany(() => Resultado)
  resultados: Resultado[];

  @HasMany(() => Favorito, { onDelete: 'CASCADE' })
  favoritos: Favorito[];
}