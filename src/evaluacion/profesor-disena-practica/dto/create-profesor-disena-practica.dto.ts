import { IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateProfesorDisenaPracticaDto {
  @IsNumber()
  @IsNotEmpty()
  id_profesor: number;

  @IsNumber()
  @IsNotEmpty()
  id_practica: number;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;
}
