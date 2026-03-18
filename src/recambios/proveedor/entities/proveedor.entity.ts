import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProveedorSuministraPieza } from '../../proveedor-suministra-pieza/entities/proveedor-suministra-pieza.entity';

@Entity('proveedor')
export class Proveedor {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  provincia: string;

  @OneToMany(
    () => ProveedorSuministraPieza,
    (psp) => psp.proveedor,
  )
  proveedorSuministraPiezas: ProveedorSuministraPieza[];
}
