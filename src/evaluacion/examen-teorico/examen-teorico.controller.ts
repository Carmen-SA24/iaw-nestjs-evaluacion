// Controlador de rutas para exámenes teóricos
// Define los endpoints para crear, buscar, actualizar y eliminar exámenes teóricos
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamenTeoricoService } from './examen-teorico.service';
import { CreateExamenTeoricoDto } from './dto/create-examen-teorico.dto';
import { UpdateExamenTeoricoDto } from './dto/update-examen-teorico.dto';

@Controller('examen-teorico')
export class ExamenTeoricoController {
  // Accede a las funciones de Examen Teórico
  constructor(private readonly examenTeoricoService: ExamenTeoricoService) {}

  // Crea un nuevo examen teórico
  @Post()
  create(@Body() createExamenTeoricoDto: CreateExamenTeoricoDto) {
    return this.examenTeoricoService.create(createExamenTeoricoDto);
  }

  // Devuelve todos los exámenes teóricos
  @Get()
  findAll() {
    return this.examenTeoricoService.findAll();
  }

  // Busca un examen teórico por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examenTeoricoService.findOne(+id);
  }

  // Actualiza un examen teórico por id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamenTeoricoDto: UpdateExamenTeoricoDto,
  ) {
    return this.examenTeoricoService.update(+id, updateExamenTeoricoDto);
  }

  // Elimina un examen teórico por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examenTeoricoService.remove(+id);
  }
}
