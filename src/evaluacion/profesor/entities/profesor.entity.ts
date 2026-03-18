/* eslint-disable -- Evita falsos errores visuales */
// Entidad Profesor
// Define la estructura de la tabla Profesor en la base de datos
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExamenTeorico } from '../../examen-teorico/entities/examen-teorico.entity';
import { ProfesorDisenaPractica } from '../../profesor-disena-practica/entities/profesor-disena-practica.entity';

@Entity()
export class Profesor {
  // Genera un id único para cada profesor
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el NIF (único)
  @Column({ unique: true })
  nif: string;

  // Guarda el nombre
  @Column()
  nombre: string;

  // Guarda el primer apellido
  @Column()
  apellido1: string;

  // Guarda el segundo apellido
  @Column()
  apellido2: string;

  // Crea la relación para los exámenes creados
  @OneToMany(() => ExamenTeorico, (examen) => examen.profesor)
  examenesTeoricos: ExamenTeorico[];

  // Crea la relación para las prácticas diseñadas
  @OneToMany(() => ProfesorDisenaPractica, (pdp) => pdp.profesor)
  profesorDisenaPracticas: ProfesorDisenaPractica[];
}
