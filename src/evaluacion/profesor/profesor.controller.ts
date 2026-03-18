// Controlador de rutas para profesores
// Define los endpoints para crear, buscar, actualizar y eliminar profesores
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  // Accede a las funciones de Profesor
  constructor(private readonly profesorService: ProfesorService) {}

  // Crea un nuevo profesor
  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  // Devuelve todos los profesores
  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  // Busca un profesor por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  // Actualiza un profesor por id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  // Elimina un profesor por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
