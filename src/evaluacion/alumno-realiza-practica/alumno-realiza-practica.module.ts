import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoRealizaPracticaService } from './alumno-realiza-practica.service';
import { AlumnoRealizaPracticaController } from './alumno-realiza-practica.controller';
import { AlumnoRealizaPractica } from './entities/alumno-realiza-practica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoRealizaPractica])],
  controllers: [AlumnoRealizaPracticaController],
  providers: [AlumnoRealizaPracticaService],
})
export class AlumnoRealizaPracticaModule {}
