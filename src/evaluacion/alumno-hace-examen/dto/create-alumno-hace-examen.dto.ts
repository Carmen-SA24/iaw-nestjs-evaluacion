import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAlumnoHaceExamenDto {
  @IsNumber()
  @IsNotEmpty()
  id_alumno: number;

  @IsNumber()
  @IsNotEmpty()
  id_examen_teorico: number;

  @IsNumber()
  @IsNotEmpty()
  nota: number;
}
