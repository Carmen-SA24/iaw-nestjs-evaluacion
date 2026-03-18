// Define las funciones u operaciones para exámenes teóricos
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenTeoricoDto } from './dto/create-examen-teorico.dto';
import { UpdateExamenTeoricoDto } from './dto/update-examen-teorico.dto';
import { ExamenTeorico } from './entities/examen-teorico.entity';

@Injectable()
export class ExamenTeoricoService {
  // Accede a la base de datos de Examen Teórico
  constructor(
    @InjectRepository(ExamenTeorico)
    private examenTeoricoRepository: Repository<ExamenTeorico>,
  ) {}

  // Crea un nuevo examen teórico en la BD
  create(createExamenTeoricoDto: CreateExamenTeoricoDto) {
    // Para crearlo con de forma que podamos vincularlo al profesor enviando profesorId:
    const { profesorId, ...examenData } = createExamenTeoricoDto;
    const examen = this.examenTeoricoRepository.create({
      ...examenData,
      profesor: { id: profesorId },
    });
    return this.examenTeoricoRepository.save(examen);
  }

  // Devuelve todos los exámenes teóricos de la BD
  findAll() {
    return this.examenTeoricoRepository.find();
  }

  // Busca un examen teórico en la BD por id
  async findOne(id: number) {
    const examen = await this.examenTeoricoRepository.findOne({
      where: { id },
    });
    if (!examen)
      throw new NotFoundException(`Examen con ID ${id} no encontrado`);
    return examen;
  }

  // Actualiza un examen teórico en la BD por id
  async update(id: number, updateExamenTeoricoDto: UpdateExamenTeoricoDto) {
    await this.findOne(id);
    await this.examenTeoricoRepository.update(id, updateExamenTeoricoDto);
    return this.findOne(id);
  }

  // Elimina un examen teórico en la BD por id
  async remove(id: number) {
    const examen = await this.findOne(id);
    return this.examenTeoricoRepository.remove(examen);
  }
}
