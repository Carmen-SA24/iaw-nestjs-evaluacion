import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Controlador de usuarios: expone endpoints para consultar información del usuario autenticado
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Obtiene el perfil del usuario autenticado (requiere token JWT)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findByEmail(req.user.email);
  }
}
