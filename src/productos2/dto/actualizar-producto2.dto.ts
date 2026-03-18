import { PartialType } from '@nestjs/mapped-types';
import { CrearProducto2Dto } from './crear-producto2.dto';

export class ActualizarProducto2Dto extends PartialType(CrearProducto2Dto) {}
