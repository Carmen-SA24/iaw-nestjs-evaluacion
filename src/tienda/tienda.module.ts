import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { CarritoModule } from './carrito/carrito.module';

// Módulo principal de la tienda online
// Agrupa los submódulos de Producto y Carrito
@Module({
  imports: [ProductoModule, CarritoModule]
})
export class TiendaModule {}
