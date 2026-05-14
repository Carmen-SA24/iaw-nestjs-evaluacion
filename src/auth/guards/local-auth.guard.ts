import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard que valida las credenciales (email y password) usando LocalStrategy
// Se usa en el endpoint de login antes de generar el token JWT
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
