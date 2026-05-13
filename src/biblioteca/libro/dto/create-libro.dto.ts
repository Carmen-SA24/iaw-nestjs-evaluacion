import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  portada: string;

  @IsNumber()
  @IsNotEmpty()
  autorId: number;
}
