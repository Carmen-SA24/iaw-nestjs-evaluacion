import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductSize } from '../../product-size/entities/product-size.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.size)
  productSizes: ProductSize[];
}
