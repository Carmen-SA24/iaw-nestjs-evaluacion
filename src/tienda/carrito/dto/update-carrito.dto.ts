import { IsNumber, IsOptional, Min } from 'class-validator';

// DTO para actualizar la cantidad de un producto en el carrito
export class UpdateCarritoDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  cantidad?: number;
}
