// Define la estructura y validación de los datos para crear alumnos
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAlumnoDto {
  // Guarda el NIF (no debe estar vacío)
  @IsString()
  @IsNotEmpty()
  nif: string;

  // Guarda el grupo (no debe estar vacío)
  @IsString()
  @IsNotEmpty()
  grupo: string;

  // Guarda el nombre (no debe estar vacío)
  @IsString()
  @IsNotEmpty()
  nombre: string;

  // Guarda el primer apellido (no debe estar vacío)
  @IsString()
  @IsNotEmpty()
  apellido1: string;

  // Guarda el segundo apellido (no debe estar vacío)
  @IsString()
  @IsNotEmpty()
  apellido2: string;
}
