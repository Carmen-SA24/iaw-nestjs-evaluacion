// Controlador de rutas para prácticas
// Define los endpoints para crear, buscar, actualizar y eliminar prácticas
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PracticaService } from './practica.service';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';

@Controller('practica')
export class PracticaController {
  // Accede a las funciones de Práctica
  constructor(private readonly practicaService: PracticaService) {}

  // Crea una nueva práctica
  @Post()
  create(@Body() createPracticaDto: CreatePracticaDto) {
    return this.practicaService.create(createPracticaDto);
  }

  // Devuelve todas las prácticas
  @Get()
  findAll() {
    return this.practicaService.findAll();
  }

  // Busca una práctica por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practicaService.findOne(+id);
  }

  // Actualiza una práctica por id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePracticaDto: UpdatePracticaDto,
  ) {
    return this.practicaService.update(+id, updatePracticaDto);
  }

  // Elimina una práctica por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practicaService.remove(+id);
  }
}
