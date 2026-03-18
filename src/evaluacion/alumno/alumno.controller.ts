// Controlador de rutas para alumnos
// Define los endpoints para crear, buscar, actualizar y eliminar alumnos
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumno')
export class AlumnoController {
  // Accede a las funciones de Alumno
  constructor(private readonly alumnoService: AlumnoService) {}

  // Crea un nuevo alumno
  @Post()
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnoService.create(createAlumnoDto);
  }

  // Devuelve todos los alumnos
  @Get()
  findAll() {
    return this.alumnoService.findAll();
  }

  // Busca un alumno por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoService.findOne(+id);
  }

  // Actualiza un alumno por id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoService.update(+id, updateAlumnoDto);
  }

  // Elimina un alumno por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoService.remove(+id);
  }
}
