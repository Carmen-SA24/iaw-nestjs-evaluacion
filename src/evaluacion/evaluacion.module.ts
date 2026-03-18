import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumno/alumno.module';
import { PracticaModule } from './practica/practica.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ExamenTeoricoModule } from './examen-teorico/examen-teorico.module';
import { AlumnoRealizaPracticaModule } from './alumno-realiza-practica/alumno-realiza-practica.module';
import { AlumnoHaceExamenModule } from './alumno-hace-examen/alumno-hace-examen.module';
import { ProfesorDisenaPracticaModule } from './profesor-disena-practica/profesor-disena-practica.module';

@Module({
  imports: [AlumnoModule, PracticaModule, ProfesorModule, ExamenTeoricoModule, AlumnoRealizaPracticaModule, AlumnoHaceExamenModule, ProfesorDisenaPracticaModule]
})
export class EvaluacionModule {}
