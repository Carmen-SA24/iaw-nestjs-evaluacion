import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

// DTO para actualizar un producto existente
// Todos los campos son opcionales, solo se actualizan los que se envían
export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
