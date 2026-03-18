// Controlador de rutas para la relación entre Alumnos y Prácticas
// Define los endpoints para añadir notas de prácticas o buscar el historial
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AlumnoRealizaPracticaService } from './alumno-realiza-practica.service';
import { CreateAlumnoRealizaPracticaDto } from './dto/create-alumno-realiza-practica.dto';
import { UpdateAlumnoRealizaPracticaDto } from './dto/update-alumno-realiza-practica.dto';

@Controller('alumno-realiza-practica')
export class AlumnoRealizaPracticaController {
  // Accede a las funciones de tabla intermedia
  constructor(private readonly service: AlumnoRealizaPracticaService) {}

  // Crea una nueva calificación de un alumno en una práctica
  @Post()
  create(@Body() createDto: CreateAlumnoRealizaPracticaDto) {
    return this.service.create(createDto);
  }

  // Devuelve todas las calificaciones
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Busca todas las prácticas realizadas por un alumno específico
  @Get('alumno/:idAlumno')
  findByAlumno(@Param('idAlumno') idAlumno: string) {
    return this.service.findByAlumno(+idAlumno);
  }

  // Busca un registro de calificación por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  // Actualiza una nota o fecha por id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAlumnoRealizaPracticaDto,
  ) {
    return this.service.update(+id, updateDto);
  }

  // Elimina un registro de calificación por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
