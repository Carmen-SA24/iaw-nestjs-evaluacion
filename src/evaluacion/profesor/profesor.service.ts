// Define las funciones u operaciones para profesores
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {
  // Accede a la base de datos de Profesor
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  // Crea un nuevo profesor en la BD
  create(createProfesorDto: CreateProfesorDto) {
    const profesor = this.profesorRepository.create(createProfesorDto);
    return this.profesorRepository.save(profesor);
  }

  // Devuelve todos los profesores de la BD
  findAll() {
    return this.profesorRepository.find();
  }

  // Busca un profesor en la BD por id
  async findOne(id: number) {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor)
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    return profesor;
  }

  // Actualiza un profesor en la BD por id
  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    await this.findOne(id);
    await this.profesorRepository.update(id, updateProfesorDto);
    return this.findOne(id);
  }

  // Elimina un profesor en la BD por id
  async remove(id: number) {
    const profesor = await this.findOne(id);
    return this.profesorRepository.remove(profesor);
  }
}
