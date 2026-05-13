import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  biografia: string;

  @IsString()
  @IsNotEmpty()
  foto: string;
}
