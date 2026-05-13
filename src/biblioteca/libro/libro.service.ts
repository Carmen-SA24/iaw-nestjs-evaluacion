// Define las funciones u operaciones para libros
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
  ) {}

  create(createLibroDto: CreateLibroDto) {
    const { autorId, ...libroData } = createLibroDto;
    const libro = this.libroRepository.create({
      ...libroData,
      autor: { id: autorId },
    });
    return this.libroRepository.save(libro);
  }

  findAll() {
    return this.libroRepository.find({
      relations: ['autor'],
    });
  }

  async findOne(id: number) {
    const libro = await this.libroRepository.findOne({
      where: { id },
      relations: ['autor'],
    });
    if (!libro) throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    return libro;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    await this.findOne(id);
    await this.libroRepository.update(id, updateLibroDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const libro = await this.findOne(id);
    return this.libroRepository.remove(libro);
  }
}
