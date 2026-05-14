import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

// Controlador de autenticación: expone endpoints para registro, login y perfil
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Registro de nuevo usuario: recibe email, password y nombre
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Inicio de sesión: valida credenciales con LocalAuthGuard y devuelve token JWT
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Obtiene el perfil del usuario autenticado (requiere token JWT válido)
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
