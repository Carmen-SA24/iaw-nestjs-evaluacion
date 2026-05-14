import { Injectable } from '@nestjs/common';

// Servicio principal de la aplicación
@Injectable()
export class AppService {
  // Devuelve un mensaje de bienvenida para el endpoint raíz
  getHello(): string {
    return 'Hello World!';
  }
  getHola(): string {
    return 'Hola a todos los alumnos de ASIR!';
  }
}
