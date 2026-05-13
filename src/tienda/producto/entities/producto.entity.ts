import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Entidad que representa un producto de la tienda
@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  // Precio con 2 decimales (ej: 19.99)
  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  // URL de la imagen del producto
  @Column()
  imagen: string;

  // Cantidad disponible en inventario
  @Column({ default: 0 })
  stock: number;

  // Indica si el producto está disponible para la venta
  @Column({ default: true })
  disponible: boolean;
}
