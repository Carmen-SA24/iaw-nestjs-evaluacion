import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductSizeDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
