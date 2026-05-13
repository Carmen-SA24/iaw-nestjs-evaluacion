import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';

// Servicio que gestiona las operaciones del carrito de compra
@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
  ) {}

  // Añade un producto al carrito del usuario.
  // Si el producto ya existe en el carrito (no pagado), incrementa la cantidad.
  async create(createCarritoDto: CreateCarritoDto, usuarioId: number) {
    const existente = await this.carritoRepository.findOne({
      where: {
        usuarioId,
        productoId: createCarritoDto.productoId,
        pagado: false,
      },
    });

    if (existente) {
      existente.cantidad += createCarritoDto.cantidad || 1;
      return this.carritoRepository.save(existente);
    }

    const carrito = this.carritoRepository.create({
      ...createCarritoDto,
      cantidad: createCarritoDto.cantidad || 1,
      usuarioId,
    });
    return this.carritoRepository.save(carrito);
  }

  // Devuelve todos los items del carrito (para administración)
  findAll() {
    return this.carritoRepository.find();
  }

  // Devuelve los items del carrito activo (no pagados) de un usuario específico
  findByUsuario(usuarioId: number) {
    return this.carritoRepository.find({
      where: { usuarioId, pagado: false },
    });
  }

  // Busca un item del carrito por su ID
  async findOne(id: number) {
    const carrito = await this.carritoRepository.findOneBy({ id });
    if (!carrito) {
      throw new NotFoundException(`Carrito con id ${id} no encontrado`);
    }
    return carrito;
  }

  // Actualiza la cantidad de un producto en el carrito
  async update(id: number, updateCarritoDto: UpdateCarritoDto) {
    const carrito = await this.findOne(id);
    Object.assign(carrito, updateCarritoDto);
    return this.carritoRepository.save(carrito);
  }

  // Elimina un producto del carrito
  async remove(id: number) {
    const carrito = await this.findOne(id);
    return this.carritoRepository.remove(carrito);
  }

  // Procesa el pago de todos los items pendientes del usuario.
  // Marca como pagados y asigna la fecha actual.
  async pagar(usuarioId: number) {
    const items = await this.carritoRepository.find({
      where: { usuarioId, pagado: false },
    });

    if (items.length === 0) {
      throw new NotFoundException('No hay items pendientes de pago');
    }

    const fecha = new Date();
    for (const item of items) {
      item.pagado = true;
      item.fechaPago = fecha;
    }
    return this.carritoRepository.save(items);
  }
}
