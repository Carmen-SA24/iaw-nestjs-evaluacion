import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoHaceExamenDto } from './create-alumno-hace-examen.dto';

export class UpdateAlumnoHaceExamenDto extends PartialType(
  CreateAlumnoHaceExamenDto,
) {}
