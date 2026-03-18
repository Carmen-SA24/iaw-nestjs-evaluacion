import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoRealizaPracticaDto } from './create-alumno-realiza-practica.dto';

export class UpdateAlumnoRealizaPracticaDto extends PartialType(
  CreateAlumnoRealizaPracticaDto,
) {}
