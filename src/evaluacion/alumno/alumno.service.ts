// Define las funciones u operaciones para alumnos
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnoService {
  // Accede a la base de datos de Alumno
  constructor(
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
  ) {}

  // Crea un nuevo alumno en la BD
  create(createAlumnoDto: CreateAlumnoDto) {
    const alumno = this.alumnoRepository.create(createAlumnoDto);
    return this.alumnoRepository.save(alumno);
  }

  // Devuelve todos los alumnos de la BD
  findAll() {
    return this.alumnoRepository.find();
  }

  // Busca un alumno en la BD por id
  async findOne(id: number) {
    const alumno = await this.alumnoRepository.findOne({ where: { id } });
    if (!alumno)
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    return alumno;
  }

  // Actualiza un alumno en la BD por id
  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    await this.findOne(id);
    await this.alumnoRepository.update(id, updateAlumnoDto);
    return this.findOne(id);
  }

  // Elimina un alumno en la BD por id
  async remove(id: number) {
    const alumno = await this.findOne(id);
    return this.alumnoRepository.remove(alumno);
  }
}
