import { IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAlumnoRealizaPracticaDto {
  @IsNumber()
  @IsNotEmpty()
  id_alumno: number;

  @IsNumber()
  @IsNotEmpty()
  id_practica: number;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsNumber()
  @IsNotEmpty()
  nota: number;
}
