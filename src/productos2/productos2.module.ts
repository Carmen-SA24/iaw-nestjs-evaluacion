import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto2 } from './entities/producto2.entity';
import { Talla } from '../tallas/entities/talla.entity';
import { Productos2Service } from './productos2.service';
import { Productos2Controller } from './productos2.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Producto2, Talla])],
  providers: [Productos2Service],
  controllers: [Productos2Controller],
  exports: [Productos2Service],
})
export class Productos2Module {}
