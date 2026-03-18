import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfesorDto {
  @IsString()
  @IsNotEmpty()
  nif: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido1: string;

  @IsString()
  @IsNotEmpty()
  apellido2: string;
}
