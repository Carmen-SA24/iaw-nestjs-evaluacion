import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoHaceExamenService } from './alumno-hace-examen.service';
import { AlumnoHaceExamenController } from './alumno-hace-examen.controller';
import { AlumnoHaceExamen } from './entities/alumno-hace-examen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoHaceExamen])],
  controllers: [AlumnoHaceExamenController],
  providers: [AlumnoHaceExamenService],
})
export class AlumnoHaceExamenModule {}
