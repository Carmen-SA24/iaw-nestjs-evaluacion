/* eslint-disable -- Evita falsos errores visuales */
// Entidad Alumno
// Define la estructura de la tabla Alumno en la base de datos
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlumnoRealizaPractica } from '../../alumno-realiza-practica/entities/alumno-realiza-practica.entity';
import { AlumnoHaceExamen } from '../../alumno-hace-examen/entities/alumno-hace-examen.entity';

@Entity()
export class Alumno {
  // Genera un id único para cada alumno
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el NIF (único)
  @Column({ unique: true })
  nif: string;

  // Guarda el grupo
  @Column()
  grupo: string;

  // Guarda el nombre
  @Column()
  nombre: string;

  // Guarda el primer apellido
  @Column()
  apellido1: string;

  // Guarda el segundo apellidoñ
  @Column()
  apellido2: string;

  // Crea la relación para las prácticas
  @OneToMany(
    () => AlumnoRealizaPractica,
    (arp: AlumnoRealizaPractica) => arp.alumno,
  )
  alumnoRealizaPracticas: AlumnoRealizaPractica[];

  // Crea la relación para los exámenes
  @OneToMany(() => AlumnoHaceExamen, (ahe: AlumnoHaceExamen) => ahe.alumno)
  alumnoHaceExamenes: AlumnoHaceExamen[];
}
