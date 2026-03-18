// Define las funciones u operaciones para las calificaciones de prácticas
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumnoRealizaPracticaDto } from './dto/create-alumno-realiza-practica.dto';
import { UpdateAlumnoRealizaPracticaDto } from './dto/update-alumno-realiza-practica.dto';
import { AlumnoRealizaPractica } from './entities/alumno-realiza-practica.entity';

@Injectable()
export class AlumnoRealizaPracticaService {
  // Accede a la base de datos de AlumnoRealizaPractica
  constructor(
    @InjectRepository(AlumnoRealizaPractica)
    private repository: Repository<AlumnoRealizaPractica>,
  ) {}

  // Crea una nueva calificación en la BD
  create(createDto: CreateAlumnoRealizaPracticaDto) {
    const registro = this.repository.create({
      id_alumno: createDto.id_alumno,
      id_practica: createDto.id_practica,
      fecha: createDto.fecha,
      nota: createDto.nota,
    });
    return this.repository.save(registro);
  }

  // Devuelve todas las calificaciones de la BD unidas a sus alumnos y prácticas
  findAll() {
    return this.repository.find({
      relations: ['alumno', 'practica'],
    });
  }

  // Devuelve todas las prácticas realizadas por un alumno en concreto
  findByAlumno(idAlumno: number) {
    return this.repository.find({
      where: { id_alumno: idAlumno },
      relations: ['alumno', 'practica'],
    });
  }

  // Busca una calificación en la BD por id
  async findOne(id: number) {
    const registro = await this.repository.findOne({
      where: { id },
      relations: ['alumno', 'practica'],
    });
    if (!registro)
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    return registro;
  }

  // Actualiza una calificación en la BD por id
  async update(id: number, updateDto: UpdateAlumnoRealizaPracticaDto) {
    await this.findOne(id);
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  // Elimina una calificación en la BD por id
  async remove(id: number) {
    const registro = await this.findOne(id);
    return this.repository.remove(registro);
  }
}
