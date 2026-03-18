import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { Pieza } from '../../pieza/entities/pieza.entity';

@Entity('proveedor_suministra_pieza')
export class ProveedorSuministraPieza {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.proveedorSuministraPiezas)
  proveedor: Proveedor;

  @ManyToOne(() => Pieza, (pieza) => pieza.proveedorSuministraPiezas)
  pieza: Pieza;

  @Column()
  fecha: string;

  @Column()
  cantidad: number;
}
