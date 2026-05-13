import { IsNumber, IsNotEmpty, Min, IsOptional } from 'class-validator';

// DTO para añadir un producto al carrito
// Solo requiere el ID del producto; la cantidad es opcional (por defecto 1)
export class CreateCarritoDto {
  @IsNumber()
  @IsNotEmpty()
  productoId: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  cantidad?: number;
}
