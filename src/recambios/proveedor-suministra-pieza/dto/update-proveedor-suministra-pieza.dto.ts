import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorSuministraPiezaDto } from './create-proveedor-suministra-pieza.dto';

export class UpdateProveedorSuministraPiezaDto extends PartialType(
  CreateProveedorSuministraPiezaDto,
) {}
