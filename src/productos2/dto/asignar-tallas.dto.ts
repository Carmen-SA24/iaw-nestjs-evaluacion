import { IsArray, IsNumber } from 'class-validator';

export class AsignarTallasDto {
  @IsArray()
  @IsNumber({}, { each: true })
  tallaIds: number[];
}
