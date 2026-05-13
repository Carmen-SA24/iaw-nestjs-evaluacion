import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

// DTO para crear un nuevo producto
// Todos los campos son obligatorios excepto stock (por defecto 0)
export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  // Precio del producto, debe ser mayor o igual a 0
  @IsNumber()
  @Min(0)
  precio: number;

  // URL de la imagen del producto
  @IsString()
  @IsNotEmpty()
  imagen: string;

  // Cantidad en stock, opcional (por defecto 0)
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}
