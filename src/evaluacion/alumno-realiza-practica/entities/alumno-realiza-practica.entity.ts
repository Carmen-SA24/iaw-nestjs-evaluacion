/* eslint-disable -- Evita falsos errores visuales */
// Entidad AlumnoRealizaPractica
// Define la estructura de la tabla intermedia entre Alumnos y Prácticas
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Alumno } from '../../alumno/entities/alumno.entity';
import { Practica } from '../../practica/entities/practica.entity';

@Entity()
export class AlumnoRealizaPractica {
  // Genera un id único para cada registro guardado
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el id del alumno correspondiente
  @Column({ name: 'id_alumno' })
  id_alumno: number;

  // Guarda el id de la práctica correspondiente
  @Column({ name: 'id_practica' })
  id_practica: number;

  // Guarda la fecha
  @Column({ type: 'date' })
  fecha: string;

  // Guarda la nota como decimal
  @Column({ type: 'decimal', precision: 4, scale: 2 })
  nota: number;

  // Crea la conexión en base de datos con Alumno (borrado en cascada)
  @ManyToOne(() => Alumno, (alumno) => alumno.alumnoRealizaPracticas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  // Crea la conexión en base de datos con Práctica (borrado en cascada)
  @ManyToOne(() => Practica, (practica) => practica.alumnoRealizaPracticas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
