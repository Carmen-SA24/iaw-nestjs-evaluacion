import { IsNotEmpty, IsString } from 'class-validator';

export class CrearTallaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
