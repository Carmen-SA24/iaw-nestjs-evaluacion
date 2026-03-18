import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Productos2Service } from './productos2.service';
import { CrearProducto2Dto } from './dto/crear-producto2.dto';
import { AsignarTallasDto } from './dto/asignar-tallas.dto';

@Controller('productos')
export class Productos2Controller {
  constructor(private readonly productosService: Productos2Service) {}

  @Post()
  crearProducto(@Body() body: CrearProducto2Dto) {
    return this.productosService.crearProducto(body);
  }

  @Get()
  async obtenerTodos() {
    return await this.productosService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return await this.productosService.obtenerPorId(+id);
  }

  @Put(':id/tallas')
  async asignarTallas(
    @Param('id') id: string,
    @Body() body: AsignarTallasDto,
  ) {
    return await this.productosService.asignarTallas(+id, body.tallaIds);
  }

  @Delete(':id')
  async eliminarProducto(@Param('id') id: string) {
    return await this.productosService.eliminarProducto(+id);
  }
}
