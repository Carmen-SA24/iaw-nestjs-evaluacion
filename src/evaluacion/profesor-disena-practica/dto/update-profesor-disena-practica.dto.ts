import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDisenaPracticaDto } from './create-profesor-disena-practica.dto';

export class UpdateProfesorDisenaPracticaDto extends PartialType(
  CreateProfesorDisenaPracticaDto,
) {}
