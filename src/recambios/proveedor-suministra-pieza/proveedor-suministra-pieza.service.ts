import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorSuministraPieza } from './entities/proveedor-suministra-pieza.entity';
import { Proveedor } from '../proveedor/entities/proveedor.entity';
import { Pieza } from '../pieza/entities/pieza.entity';
import { CreateProveedorSuministraPiezaDto } from './dto/create-proveedor-suministra-pieza.dto';
import { UpdateProveedorSuministraPiezaDto } from './dto/update-proveedor-suministra-pieza.dto';

@Injectable()
export class ProveedorSuministraPiezaService {
  constructor(
    @InjectRepository(ProveedorSuministraPieza)
    private pspRepository: Repository<ProveedorSuministraPieza>,
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Pieza)
    private piezaRepository: Repository<Pieza>,
  ) {}

  async create(createDto: CreateProveedorSuministraPiezaDto) {
    const proveedor = await this.proveedorRepository.findOne({
      where: { codigo: createDto.codigoProveedor },
    });
    const pieza = await this.piezaRepository.findOne({
      where: { codigo: createDto.codigoPieza },
    });

    if (!proveedor || !pieza) {
      throw new Error('Proveedor o Pieza no encontrados');
    }

    const psp = new ProveedorSuministraPieza();
    psp.proveedor = proveedor;
    psp.pieza = pieza;
    psp.fecha = createDto.fecha;
    psp.cantidad = createDto.cantidad;

    return this.pspRepository.save(psp);
  }

  findAll() {
    return this.pspRepository.find({
      relations: ['proveedor', 'pieza'],
    });
  }

  findOne(id: number) {
    return this.pspRepository.findOne({
      where: { id },
      relations: ['proveedor', 'pieza'],
    });
  }

  async update(id: number, updateDto: UpdateProveedorSuministraPiezaDto) {
    const psp = await this.findOne(id);
    
    if (!psp) {
      throw new Error('ProveedorSuministraPieza no encontrado');
    }

    if (updateDto.codigoProveedor) {
      const proveedor = await this.proveedorRepository.findOne({
        where: { codigo: updateDto.codigoProveedor },
      });
      if (proveedor) psp.proveedor = proveedor;
    }

    if (updateDto.codigoPieza) {
      const pieza = await this.piezaRepository.findOne({
        where: { codigo: updateDto.codigoPieza },
      });
      if (pieza) psp.pieza = pieza;
    }

    if (updateDto.fecha) psp.fecha = updateDto.fecha;
    if (updateDto.cantidad) psp.cantidad = updateDto.cantidad;

    return this.pspRepository.save(psp);
  }

  remove(id: number) {
    return this.pspRepository.delete(id);
  }
}
