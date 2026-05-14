import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

// Módulo de autenticación: gestiona registro, login y validación de usuarios
// Importa TypeOrm para la entidad User, Passport para estrategias de autenticación
// y JwtModule para la generación y validación de tokens JWT
@Module({
  imports: [
    // Registra la entidad User en TypeORM para este módulo
    TypeOrmModule.forFeature([User]),
    // Configura Passport con la estrategia por defecto 'jwt'
    PassportModule,
    // Configura JWT de forma asíncrona usando variables de entorno
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Clave secreta para firmar los tokens (desde .env o valor por defecto)
        secret: configService.get<string>('JWT_SECRET') || 'secreto_super_seguro',
        signOptions: {
          // Tiempo de expiración del token (desde .env o 60 minutos por defecto)
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '60m') as any,
        },
      }),
    }),
  ],
  // Proveedores: servicio de autenticación y estrategias de Passport
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  // Exporta AuthService para que otros módulos puedan usarlo
  exports: [AuthService],
})
export class AuthModule {}
