/* eslint-disable -- Evita falsos errores visuales */
// Entidad Autor
// Define la estructura de la tabla Autor en la base de datos
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Libro } from '../../libro/entities/libro.entity';

@Entity()
export class Autor {
  // Genera un id único para cada autor
  @PrimaryGeneratedColumn()
  id: number;

  // Guarda el nombre del autor
  @Column()
  nombre: string;

  // Guarda la biografía del autor
  @Column()
  biografia: string;

  // Guarda la URL de la foto del autor
  @Column()
  foto: string;

  // Crea la relación 1:N con Libro (un autor puede escribir muchos libros)
  @OneToMany(() => Libro, (libro) => libro.autor)
  libros: Libro[];
}
