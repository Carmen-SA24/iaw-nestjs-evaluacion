import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';

// Controlador de rutas para productos de la tienda
// Las operaciones de escritura (POST, PUT, DELETE) requieren autenticación JWT + rol admin
// Las consultas (GET) son públicas
@Controller('tienda/producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Crea un nuevo producto (requiere autenticación y rol admin)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  // Lista todos los productos o filtra por query (público)
  // Ej: GET /tienda/producto?query=portátil
  @Get()
  findAll(@Query('query') query?: string) {
    return this.productoService.findAll(query);
  }

  // Obtiene el detalle de un producto por ID (público)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  // Actualiza un producto (requiere autenticación y rol admin)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  // Elimina un producto (requiere autenticación y rol admin)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
