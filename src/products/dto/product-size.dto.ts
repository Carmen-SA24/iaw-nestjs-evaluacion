import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductSizeDto {
  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
