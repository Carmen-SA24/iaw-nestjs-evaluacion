import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorDisenaPracticaService } from './profesor-disena-practica.service';
import { ProfesorDisenaPracticaController } from './profesor-disena-practica.controller';
import { ProfesorDisenaPractica } from './entities/profesor-disena-practica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorDisenaPractica])],
  controllers: [ProfesorDisenaPracticaController],
  providers: [ProfesorDisenaPracticaService],
})
export class ProfesorDisenaPracticaModule {}
