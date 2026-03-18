import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProveedorSuministraPiezaService } from './proveedor-suministra-pieza.service';
import { CreateProveedorSuministraPiezaDto } from './dto/create-proveedor-suministra-pieza.dto';
import { UpdateProveedorSuministraPiezaDto } from './dto/update-proveedor-suministra-pieza.dto';

@Controller('proveedor-suministra-pieza')
export class ProveedorSuministraPiezaController {
  constructor(
    private readonly proveedorSuministraPiezaService: ProveedorSuministraPiezaService,
  ) {}

  @Post()
  create(@Body() createDto: CreateProveedorSuministraPiezaDto) {
    return this.proveedorSuministraPiezaService.create(createDto);
  }

  @Get()
  findAll() {
    return this.proveedorSuministraPiezaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorSuministraPiezaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProveedorSuministraPiezaDto) {
    return this.proveedorSuministraPiezaService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedorSuministraPiezaService.remove(+id);
  }
}
