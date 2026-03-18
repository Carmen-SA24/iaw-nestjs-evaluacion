import { PartialType } from '@nestjs/mapped-types';
import { CrearTallaDto } from './crear-talla.dto';

export class ActualizarTallaDto extends PartialType(CrearTallaDto) {}
