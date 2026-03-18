import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talla } from './entities/talla.entity';
import { CrearTallaDto } from './dto/crear-talla.dto';
import { ActualizarTallaDto } from './dto/actualizar-talla.dto';

@Injectable()
export class TallasService {
  constructor(
    @InjectRepository(Talla)
    private tallasRepository: Repository<Talla>,
  ) {}

  async create(crearTallaDto: CrearTallaDto): Promise<Talla> {
    const talla = this.tallasRepository.create(crearTallaDto);
    return await this.tallasRepository.save(talla);
  }

  async findAll(): Promise<Talla[]> {
    return await this.tallasRepository.find({ relations: ['productos'] });
  }

  async findOne(id: number): Promise<Talla> {
    const talla = await this.tallasRepository.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!talla) {
      throw new NotFoundException(`Talla con ID ${id} no encontrada`);
    }
    return talla;
  }

  async update(id: number, actualizarTallaDto: ActualizarTallaDto): Promise<Talla> {
    const talla = await this.findOne(id);
    Object.assign(talla, actualizarTallaDto);
    return await this.tallasRepository.save(talla);
  }

  async remove(id: number): Promise<void> {
    const talla = await this.findOne(id);
    await this.tallasRepository.remove(talla);
  }
}
