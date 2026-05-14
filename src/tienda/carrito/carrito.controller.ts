import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';

// Controlador de rutas para el carrito de compra
// Las rutas de administración requieren JWT + AdminGuard
// Las rutas de usuario requieren solo JwtAuthGuard
@Controller('tienda/carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  // Añade un producto al carrito del usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCarritoDto: CreateCarritoDto, @Req() req) {
    return this.carritoService.create(createCarritoDto, req.user.id);
  }

  // Lista todos los items del carrito (solo administración)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.carritoService.findAll();
  }

  // Lista los items del carrito activo del usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Get('mio')
  findMio(@Req() req) {
    return this.carritoService.findByUsuario(req.user.id);
  }

  // Detalle de un item del carrito por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritoService.findOne(+id);
  }

  // Actualiza la cantidad de un producto en el carrito
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarritoDto: UpdateCarritoDto,
  ) {
    return this.carritoService.update(+id, updateCarritoDto);
  }

  // Elimina un producto del carrito
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritoService.remove(+id);
  }

  // Procesa el pago de todos los items pendientes del usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Post('pagar')
  pagar(@Req() req) {
    return this.carritoService.pagar(req.user.id);
  }
}
