/* eslint-disable */ // Evita falsos errores visuales
// Entidad ProfesorDisenaPractica
// Define la estructura de la tabla intermedia entre Profesores y Prácticas
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { Practica } from '../../practica/entities/practica.entity';

@Entity()
export class ProfesorDisenaPractica {
  // Genera un id único para cada registro guardado
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el id del profesor correspondiente
  @Column({ name: 'id_profesor' })
  id_profesor: number;

  // Guarda el id de la práctica correspondiente
  @Column({ name: 'id_practica' })
  id_practica: number;

  // Guarda la fecha de diseño
  @Column({ type: 'date' })
  fecha: string;

  // Crea la conexión en base de datos con Profesor (borrado en cascada)
  @ManyToOne(() => Profesor, (profesor) => profesor.profesorDisenaPracticas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_profesor' })
  profesor: Profesor;

  // Crea la conexión en base de datos con Práctica (borrado en cascada)
  @ManyToOne(() => Practica, (practica) => practica.profesorDisenaPracticas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
