import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

// Estrategia de Passport para autenticación local (email + password)
// Se usa en el login para validar las credenciales del usuario
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura para usar 'email' en lugar del 'username' por defecto
    super({ usernameField: 'email' });
  }

  // Valida que el email y password correspondan a un usuario existente
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }
}
