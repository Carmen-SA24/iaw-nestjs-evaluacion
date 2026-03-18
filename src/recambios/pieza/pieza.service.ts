import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from './entities/pieza.entity';
import { CreatePiezaDto } from './dto/create-pieza.dto';
import { UpdatePiezaDto } from './dto/update-pieza.dto';

@Injectable()
export class PiezaService {
  constructor(
    @InjectRepository(Pieza)
    private piezaRepository: Repository<Pieza>,
  ) {}

  create(createPiezaDto: CreatePiezaDto) {
    return this.piezaRepository.save(createPiezaDto);
  }

  findAll() {
    return this.piezaRepository.find({ relations: ['categoria'] });
  }

  findOne(id: number) {
    return this.piezaRepository.findOne({
      where: { codigo: id },
      relations: ['categoria'],
    });
  }

  update(id: number, updatePiezaDto: UpdatePiezaDto) {
    return this.piezaRepository.update(id, updatePiezaDto);
  }

  remove(id: number) {
    return this.piezaRepository.delete(id);
  }

  async getPiezasRojasProveedorCategoria(): Promise<any> {
    const result = await this.piezaRepository
      .createQueryBuilder('pieza')
      .innerJoin('pieza.proveedorSuministraPiezas', 'psp')
      .innerJoin('psp.proveedor', 'proveedor')
      .innerJoin('pieza.categoria', 'categoria')
      .where('pieza.color = :color', { color: 'rojo' })
      .select([
        'proveedor.codigo AS proveedorCodigo',
        'proveedor.direccion AS proveedorDireccion',
        'categoria.codigo AS categoriaCodigo',
        'categoria.nombre AS categoriaNombre',
      ])
      .distinct(true)
      .getRawMany();

    return result.map((item) => ({
      proveedor: `${item.proveedorCodigo} - ${item.proveedorDireccion}`,
      categoria: `${item.categoriaCodigo} - ${item.categoriaNombre}`,
    }));
  }
}
