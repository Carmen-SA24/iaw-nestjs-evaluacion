import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

// Servicio que gestiona las operaciones CRUD de productos
@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // Crea un nuevo producto en la base de datos
  create(createProductoDto: CreateProductoDto) {
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  // Lista todos los productos. Si se pasa un query, filtra por nombre o descripción
  findAll(query?: string) {
    if (query) {
      return this.productoRepository.find({
        where: [
          { nombre: Like(`%${query}%`) },
          { descripcion: Like(`%${query}%`) },
        ],
      });
    }
    return this.productoRepository.find();
  }

  // Busca un producto por su ID. Lanza error si no existe
  async findOne(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  // Actualiza los campos de un producto existente
  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  // Elimina un producto de la base de datos
  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepository.remove(producto);
  }
}
