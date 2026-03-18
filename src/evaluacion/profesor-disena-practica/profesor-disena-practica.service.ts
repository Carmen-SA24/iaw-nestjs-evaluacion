// Define las funciones u operaciones para el diseño de prácticas por profesores
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDisenaPracticaDto } from './dto/create-profesor-disena-practica.dto';
import { UpdateProfesorDisenaPracticaDto } from './dto/update-profesor-disena-practica.dto';
import { ProfesorDisenaPractica } from './entities/profesor-disena-practica.entity';

@Injectable()
export class ProfesorDisenaPracticaService {
  // Accede a la base de datos de ProfesorDisenaPractica
  constructor(
    @InjectRepository(ProfesorDisenaPractica)
    private repository: Repository<ProfesorDisenaPractica>,
  ) {}

  // Crea un nuevo registro de diseño de práctica en la BD
  create(createDto: CreateProfesorDisenaPracticaDto) {
    const registro = this.repository.create({
      id_profesor: createDto.id_profesor,
      id_practica: createDto.id_practica,
      fecha: createDto.fecha,
    });
    return this.repository.save(registro);
  }

  // Devuelve todos los registros de la BD unidos a sus profesores y prácticas
  findAll() {
    return this.repository.find({
      relations: ['profesor', 'practica'],
    });
  }

  // Busca un registro de diseño en la BD por id
  async findOne(id: number) {
    const registro = await this.repository.findOne({
      where: { id },
      relations: ['profesor', 'practica'],
    });
    if (!registro)
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    return registro;
  }

  // Actualiza un registro en la BD por id
  async update(id: number, updateDto: UpdateProfesorDisenaPracticaDto) {
    await this.findOne(id);
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  // Elimina un registro de diseño en la BD por id
  async remove(id: number) {
    const registro = await this.findOne(id);
    return this.repository.remove(registro);
  }
}
