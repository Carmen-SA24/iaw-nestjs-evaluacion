import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenTeoricoService } from './examen-teorico.service';
import { ExamenTeoricoController } from './examen-teorico.controller';
import { ExamenTeorico } from './entities/examen-teorico.entity';
import { ProfesorModule } from '../profesor/profesor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenTeorico]), ProfesorModule],
  controllers: [ExamenTeoricoController],
  providers: [ExamenTeoricoService],
  exports: [ExamenTeoricoService],
})
export class ExamenTeoricoModule {}
