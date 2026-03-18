import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Talla } from '../../tallas/entities/talla.entity';

@Entity('productos2')
export class Producto2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => Talla, (talla) => talla.productos)
  @JoinTable()
  tallas: Talla[];
}
