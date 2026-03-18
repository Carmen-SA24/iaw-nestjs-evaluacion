import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Producto2 } from './entities/producto2.entity';
import { Talla } from '../tallas/entities/talla.entity';
import { CrearProducto2Dto } from './dto/crear-producto2.dto';
import { ActualizarProducto2Dto } from './dto/actualizar-producto2.dto';

@Injectable()
export class Productos2Service {
  constructor(
    @InjectRepository(Producto2)
    private productos2Repository: Repository<Producto2>,
    @InjectRepository(Talla)
    private tallasRepository: Repository<Talla>,
  ) {}

  async crearProducto(crearProducto2Dto: CrearProducto2Dto): Promise<Producto2> {
    const { nombre, descripcion, tallaIds } = crearProducto2Dto;

    const producto = this.productos2Repository.create({
      nombre,
      descripcion,
    });

    // Cuando se crea el producto ya se colocan las tallas
    if (tallaIds.length > 0) {
      const tallas = await this.tallasRepository.find({
        where: { id: In(tallaIds) },
      });
      producto.tallas = tallas;
    }

    return await this.productos2Repository.save(producto);
  }

  async obtenerTodos(): Promise<Producto2[]> {
    return await this.productos2Repository.find({ relations: ['tallas'] });
  }

  async obtenerPorId(id: number): Promise<Producto2> {
    const producto = await this.productos2Repository.findOne({
      where: { id },
      relations: ['tallas'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async asignarTallas(productId: number, tallaIds: number[]): Promise<Producto2> {
    const producto = await this.productos2Repository.findOne({
      where: { id: productId },
      relations: ['tallas'],
    });

    if (!producto) {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }

    const tallas = await this.tallasRepository.find({
      where: { id: In(tallaIds) },
    });
    producto.tallas = tallas;

    return await this.productos2Repository.save(producto);
  }

  async eliminarProducto(id: number): Promise<string> {
    const producto = await this.productos2Repository.findOne({
      where: { id },
    });

    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    await this.productos2Repository.remove(producto);
    return `Producto con ID ${id} eliminado correctamente`;
  }
}
