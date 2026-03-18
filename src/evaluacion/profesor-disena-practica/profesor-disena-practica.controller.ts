// Controlador de rutas para la relación entre Profesor y Práctica
// Define los endpoints para registrar, buscar o modificar qué profesor hizo qué práctica
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesorDisenaPracticaService } from './profesor-disena-practica.service';
import { CreateProfesorDisenaPracticaDto } from './dto/create-profesor-disena-practica.dto';
import { UpdateProfesorDisenaPracticaDto } from './dto/update-profesor-disena-practica.dto';

@Controller('profesor-disena-practica')
export class ProfesorDisenaPracticaController {
  // Accede a las funciones de tabla intermedia
  constructor(private readonly service: ProfesorDisenaPracticaService) {}

  // Crea un nuevo registro de un diseño de práctica
  @Post()
  create(@Body() createDto: CreateProfesorDisenaPracticaDto) {
    return this.service.create(createDto);
  }

  // Devuelve todos los diseños de prácticas
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Busca un registro de diseño por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  // Actualiza un registro por id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProfesorDisenaPracticaDto,
  ) {
    return this.service.update(+id, updateDto);
  }

  // Elimina un registro de diseño por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
