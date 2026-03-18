import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticaService } from './practica.service';
import { PracticaController } from './practica.controller';
import { Practica } from './entities/practica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Practica])],
  controllers: [PracticaController],
  providers: [PracticaService],
  exports: [PracticaService],
})
export class PracticaModule {}
