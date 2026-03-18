// Define las funciones u operaciones para prácticas
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';
import { Practica } from './entities/practica.entity';

@Injectable()
export class PracticaService {
  // Accede a la base de datos de Práctica
  constructor(
    @InjectRepository(Practica)
    private practicaRepository: Repository<Practica>,
  ) {}

  // Crea una nueva práctica en la BD
  create(createPracticaDto: CreatePracticaDto) {
    const practica = this.practicaRepository.create(createPracticaDto);
    return this.practicaRepository.save(practica);
  }

  // Devuelve todas las prácticas de la BD
  findAll() {
    return this.practicaRepository.find();
  }

  // Busca una práctica en la BD por id
  async findOne(id: number) {
    const practica = await this.practicaRepository.findOne({ where: { id } });
    if (!practica)
      throw new NotFoundException(`Practica con ID ${id} no encontrada`);
    return practica;
  }

  // Actualiza una práctica en la BD por id
  async update(id: number, updatePracticaDto: UpdatePracticaDto) {
    await this.findOne(id);
    await this.practicaRepository.update(id, updatePracticaDto);
    return this.findOne(id);
  }

  // Elimina una práctica en la BD por id
  async remove(id: number) {
    const practica = await this.findOne(id);
    return this.practicaRepository.remove(practica);
  }
}
