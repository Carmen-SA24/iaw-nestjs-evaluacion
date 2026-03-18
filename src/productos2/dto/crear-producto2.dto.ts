import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class CrearProducto2Dto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsArray()
  @IsNumber({}, { each: true })
  tallaIds: number[];
}
