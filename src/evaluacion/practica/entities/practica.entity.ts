/* eslint-disable -- Evita falsos errores visuales */
// Entidad Práctica
// Define la estructura de la tabla Práctica en la base de datos
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProfesorDisenaPractica } from '../../profesor-disena-practica/entities/profesor-disena-practica.entity';
import { AlumnoRealizaPractica } from '../../alumno-realiza-practica/entities/alumno-realiza-practica.entity';

@Entity()
export class Practica {
  // Genera un id único para cada práctica
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el título de la práctica
  @Column()
  titulo: string;

  // Guarda la dificultad
  @Column()
  dificultad: string;

  // Crea la relación para los profesores (diseño)
  @OneToMany(() => ProfesorDisenaPractica, (pdp) => pdp.practica)
  profesorDisenaPracticas: ProfesorDisenaPractica[];

  // Crea la relación para los alumnos (realización)
  @OneToMany(() => AlumnoRealizaPractica, (arp) => arp.practica)
  alumnoRealizaPracticas: AlumnoRealizaPractica[];
}
