import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePracticaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  dificultad: string;
}
