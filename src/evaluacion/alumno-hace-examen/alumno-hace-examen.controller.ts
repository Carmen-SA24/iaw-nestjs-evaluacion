// Controlador de rutas para la relación entre Alumnos y Exámenes
// Define los endpoints para añadir, buscar, actualizar o borrar notas de exámenes
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AlumnoHaceExamenService } from './alumno-hace-examen.service';
import { CreateAlumnoHaceExamenDto } from './dto/create-alumno-hace-examen.dto';
import { UpdateAlumnoHaceExamenDto } from './dto/update-alumno-hace-examen.dto';

@Controller('alumno-hace-examen')
export class AlumnoHaceExamenController {
  // Accede a las funciones de tabla intermedia
  constructor(private readonly service: AlumnoHaceExamenService) {}

  // Crea una nueva nota de examen para un alumno
  @Post()
  create(@Body() createDto: CreateAlumnoHaceExamenDto) {
    return this.service.create(createDto);
  }

  // Devuelve todas las notas de exámenes guardadas
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Busca un registro de nota por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  // Actualiza una nota de examen por id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAlumnoHaceExamenDto,
  ) {
    return this.service.update(+id, updateDto);
  }

  // Elimina un registro de nota de examen por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
