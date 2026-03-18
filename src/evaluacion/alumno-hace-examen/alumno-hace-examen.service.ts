// Define las funciones u operaciones para las notas de exámenes
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumnoHaceExamenDto } from './dto/create-alumno-hace-examen.dto';
import { UpdateAlumnoHaceExamenDto } from './dto/update-alumno-hace-examen.dto';
import { AlumnoHaceExamen } from './entities/alumno-hace-examen.entity';

@Injectable()
export class AlumnoHaceExamenService {
  // Accede a la base de datos de AlumnoHaceExamen
  constructor(
    @InjectRepository(AlumnoHaceExamen)
    private repository: Repository<AlumnoHaceExamen>,
  ) {}

  // Crea una nueva nota de examen en la BD
  create(createDto: CreateAlumnoHaceExamenDto) {
    const registro = this.repository.create({
      id_alumno: createDto.id_alumno,
      id_examen_teorico: createDto.id_examen_teorico,
      nota: createDto.nota,
    });
    return this.repository.save(registro);
  }

  // Devuelve todas las notas de la BD unidas a sus alumnos y exámenes
  findAll() {
    return this.repository.find({
      relations: ['alumno', 'examenTeorico'],
    });
  }

  // Busca una nota en la BD por id
  async findOne(id: number) {
    const registro = await this.repository.findOne({
      where: { id },
      relations: ['alumno', 'examenTeorico'],
    });
    if (!registro)
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    return registro;
  }

  // Actualiza una nota en la BD por id
  async update(id: number, updateDto: UpdateAlumnoHaceExamenDto) {
    await this.findOne(id);
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  // Elimina una nota en la BD por id
  async remove(id: number) {
    const registro = await this.findOne(id);
    return this.repository.remove(registro);
  }
}
