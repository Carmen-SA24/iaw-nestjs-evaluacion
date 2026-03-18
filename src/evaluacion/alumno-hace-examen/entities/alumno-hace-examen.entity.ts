/* eslint-disable -- Evita falsos errores visuales */
// Entidad AlumnoHaceExamen
// Define la estructura de la tabla intermedia entre Alumnos y Exámenes
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Alumno } from '../../alumno/entities/alumno.entity';
import { ExamenTeorico } from '../../examen-teorico/entities/examen-teorico.entity';

@Entity()
export class AlumnoHaceExamen {
  // Genera un id único para cada registro guardado
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el id del alumno correspondiente
  @Column({ name: 'id_alumno' })
  id_alumno: number;

  // Guarda el id del examen correspondiente
  @Column({ name: 'id_examen_teorico' })
  id_examen_teorico: number;

  // Guarda la nota como decimal
  @Column({ type: 'decimal', precision: 4, scale: 2 })
  nota: number;

  // Crea la conexión en base de datos con Alumno (borrado en cascada)
  @ManyToOne(() => Alumno, (alumno) => alumno.alumnoHaceExamenes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  // Crea la conexión en base de datos con ExamenTeorico (borrado en cascada)
  @ManyToOne(
    () => ExamenTeorico,
    (examenTeorico) => examenTeorico.alumnoHaceExamenes,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'id_examen_teorico' })
  examenTeorico: ExamenTeorico;
}
