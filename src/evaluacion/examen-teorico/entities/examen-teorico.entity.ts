/* eslint-disable -- Evita falsos errores visuales */
// Entidad ExamenTeorico
// Define la estructura de la tabla ExamenTeorico en la base de datos
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { AlumnoHaceExamen } from '../../alumno-hace-examen/entities/alumno-hace-examen.entity';

@Entity()
export class ExamenTeorico {
  // Genera un id único para cada examen teórico
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el título del examen
  @Column()
  titulo: string;

  // Guarda el número de preguntas
  @Column()
  numero_preguntas: number;

  // Guarda la fecha del examen
  @Column({ type: 'date' })
  fecha: string;

  // Crea la relación con el profesor creador
  @ManyToOne(() => Profesor, (profesor) => profesor.examenesTeoricos)
  profesor: Profesor;

  // Crea la relación con los alumnos que hacen el examen
  @OneToMany(
    () => AlumnoHaceExamen,
    (ahe: AlumnoHaceExamen) => ahe.examenTeorico,
  )
  alumnoHaceExamenes: AlumnoHaceExamen[];
}
