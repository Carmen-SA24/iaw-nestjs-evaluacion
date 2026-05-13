/* eslint-disable -- Evita falsos errores visuales */
// Entidad Libro
// Define la estructura de la tabla Libro en la base de datos
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Autor } from '../../autor/entities/autor.entity';

@Entity()
export class Libro {
  // Genera un id único para cada libro
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el título del libro
  @Column()
  titulo: string;

  // Guarda la descripción del libro
  @Column()
  descripcion: string;

  // Guarda la URL de la portada del libro
  @Column()
  portada: string;

  // Crea la relación N:1 con Autor (muchos libros pueden tener un mismo autor)
  @ManyToOne(() => Autor, (autor) => autor.libros)
  autor: Autor;
}
