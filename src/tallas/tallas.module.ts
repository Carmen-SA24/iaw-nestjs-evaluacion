import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talla } from './entities/talla.entity';
import { TallasService } from './tallas.service';
import { TallasController } from './tallas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Talla])],
  providers: [TallasService],
  controllers: [TallasController],
  exports: [TallasService],
})
export class TallasModule {}
