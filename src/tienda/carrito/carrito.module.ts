import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './entities/carrito.entity';

// Módulo del carrito de compra: gestiona los items que los usuarios añaden al carrito
// Importa TypeOrm para la entidad Carrito
@Module({
  imports: [TypeOrmModule.forFeature([Carrito])],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}
