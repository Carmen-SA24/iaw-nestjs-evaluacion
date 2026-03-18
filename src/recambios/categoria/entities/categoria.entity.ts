import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pieza } from '../../pieza/entities/pieza.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nombre: string;

  @OneToMany(() => Pieza, (pieza) => pieza.categoria)
  piezas: Pieza[];
}
