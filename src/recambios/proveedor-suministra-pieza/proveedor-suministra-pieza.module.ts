import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorSuministraPieza } from './entities/proveedor-suministra-pieza.entity';
import { Proveedor } from '../proveedor/entities/proveedor.entity';
import { Pieza } from '../pieza/entities/pieza.entity';
import { ProveedorSuministraPiezaService } from './proveedor-suministra-pieza.service';
import { ProveedorSuministraPiezaController } from './proveedor-suministra-pieza.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProveedorSuministraPieza, Proveedor, Pieza]),
  ],
  controllers: [ProveedorSuministraPiezaController],
  providers: [ProveedorSuministraPiezaService],
  exports: [ProveedorSuministraPiezaService],
})
export class ProveedorSuministraPiezaModule {}
