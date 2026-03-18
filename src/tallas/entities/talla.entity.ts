import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Producto2 } from '../../productos2/entities/producto2.entity';

@Entity('tallas')
export class Talla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Producto2, (producto) => producto.tallas)
  productos: Producto2[];
}
