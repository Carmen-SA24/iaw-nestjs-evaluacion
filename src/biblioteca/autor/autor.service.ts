// Define las funciones u operaciones para autores
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor)
    private autorRepository: Repository<Autor>,
  ) {}

  create(createAutorDto: CreateAutorDto) {
    const autor = this.autorRepository.create(createAutorDto);
    return this.autorRepository.save(autor);
  }

  findAll() {
    return this.autorRepository.find();
  }

  async findOne(id: number) {
    const autor = await this.autorRepository.findOne({ where: { id } });
    if (!autor) throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    return autor;
  }

  async update(id: number, updateAutorDto: UpdateAutorDto) {
    await this.findOne(id);
    await this.autorRepository.update(id, updateAutorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const autor = await this.findOne(id);
    return this.autorRepository.remove(autor);
  }
}
