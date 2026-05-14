import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

// DTO para el inicio de sesión
// Valida que email sea un email válido y password no esté vacío
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
