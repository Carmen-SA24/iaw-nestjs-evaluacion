import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

// Guard que verifica si el usuario autenticado tiene rol de administrador
// Se usa junto con JwtAuthGuard: primero se autentica, luego se verifica el rol
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Si no hay usuario (no autenticado) o no es admin, denegar acceso
    if (!user || user.rol !== 'admin') {
      throw new ForbiddenException('Acceso denegado: se requiere rol de administrador');
    }

    return true;
  }
}
