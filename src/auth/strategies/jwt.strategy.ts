import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Estrategia de Passport para autenticación mediante token JWT
// Extrae el token del header Authorization: Bearer <token> y lo valida
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // Extrae el token del header Authorization como Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No permite tokens expirados
      ignoreExpiration: false,
      // Clave secreta para verificar la firma del token
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secreto_super_seguro',
    });
  }

  // Una vez validado el token, devuelve los datos del usuario que se añadirán a req.user
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, nombre: payload.nombre, rol: payload.rol };
  }
}
