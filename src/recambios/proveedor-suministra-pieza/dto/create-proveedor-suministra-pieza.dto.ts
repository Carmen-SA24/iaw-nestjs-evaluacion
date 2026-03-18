import { IsNotEmpty, IsNumber, IsDateString, IsPositive } from 'class-validator';

export class CreateProveedorSuministraPiezaDto {
  @IsNotEmpty()
  @IsNumber()
  codigoProveedor: number;

  @IsNotEmpty()
  @IsNumber()
  codigoPieza: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cantidad: number;
}
