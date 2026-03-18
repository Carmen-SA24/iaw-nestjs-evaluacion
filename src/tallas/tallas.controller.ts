import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TallasService } from './tallas.service';
import { CrearTallaDto } from './dto/crear-talla.dto';
import { ActualizarTallaDto } from './dto/actualizar-talla.dto';

@Controller('tallas')
export class TallasController {
  constructor(private readonly tallasService: TallasService) {}

  @Post()
  create(@Body() crearTallaDto: CrearTallaDto) {
    return this.tallasService.create(crearTallaDto);
  }

  @Get()
  findAll() {
    return this.tallasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tallasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() actualizarTallaDto: ActualizarTallaDto) {
    return this.tallasService.update(+id, actualizarTallaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tallasService.remove(+id);
  }
}
