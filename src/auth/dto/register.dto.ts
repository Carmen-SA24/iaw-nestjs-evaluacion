import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

// DTO para el registro de nuevos usuarios
// Valida que email sea un email válido, password tenga al menos 6 caracteres y nombre no esté vacío
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;
}
