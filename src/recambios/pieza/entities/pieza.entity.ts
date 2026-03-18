import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { ProveedorSuministraPieza } from '../../proveedor-suministra-pieza/entities/proveedor-suministra-pieza.entity';

@Entity('pieza')
export class Pieza {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nombre: string;

  @Column()
  color: string;

  @Column('decimal', { precision: 7, scale: 2 })
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.piezas)
  categoria: Categoria;

  @OneToMany(
    () => ProveedorSuministraPieza,
    (psp) => psp.pieza,
  )
  proveedorSuministraPiezas: ProveedorSuministraPieza[];
}
