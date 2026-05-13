import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { Producto } from '../../producto/entities/producto.entity';

// Entidad intermedia para la relación N:N entre Usuario y Producto (carrito de compra)
// Cada registro representa un producto añadido al carrito por un usuario
@Entity()
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación N:1 con Usuario — un usuario puede tener muchos items en el carrito
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column()
  usuarioId: number;

  // Relación N:1 con Producto — un producto puede estar en muchos carritos
  @ManyToOne(() => Producto, { eager: true })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  productoId: number;

  // Cantidad de unidades de este producto en el carrito
  @Column({ default: 1 })
  cantidad: number;

  // Fecha en la que se realizó el pago (nullable porque inicialmente está pendiente)
  @Column({ type: 'datetime', nullable: true })
  fechaPago: Date;

  // Indica si el item ya ha sido pagado o sigue en el carrito activo
  @Column({ default: false })
  pagado: boolean;
}
