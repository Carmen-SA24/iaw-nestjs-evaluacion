import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

// Guard que protege rutas requiriendo un token JWT válido
// Extrae el token del header Authorization: Bearer <token>
// y lo valida usando JwtStrategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Puede añadirse lógica adicional aquí si es necesario
    return super.canActivate(context);
  }
}
