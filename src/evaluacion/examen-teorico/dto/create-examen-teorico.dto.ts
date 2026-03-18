import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateExamenTeoricoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsNumber()
  @IsNotEmpty()
  numero_preguntas: number;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsNumber()
  @IsNotEmpty()
  profesorId: number;
}
