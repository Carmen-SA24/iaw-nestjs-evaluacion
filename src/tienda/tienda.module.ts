import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { CarritoModule } from './carrito/carrito.module';

@Module({
  imports: [ProductoModule, CarritoModule]
})
export class TiendaModule {}
