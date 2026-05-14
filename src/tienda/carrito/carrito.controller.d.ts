import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
export declare class CarritoController {
    private readonly carritoService;
    constructor(carritoService: CarritoService);
    create(createCarritoDto: CreateCarritoDto, req: any): Promise<import("./entities/carrito.entity").Carrito>;
    findAll(): Promise<import("./entities/carrito.entity").Carrito[]>;
    findMio(req: any): Promise<import("./entities/carrito.entity").Carrito[]>;
    findOne(id: string): Promise<import("./entities/carrito.entity").Carrito>;
    update(id: string, updateCarritoDto: UpdateCarritoDto): Promise<import("./entities/carrito.entity").Carrito>;
    remove(id: string): Promise<import("./entities/carrito.entity").Carrito>;
    pagar(req: any): Promise<import("./entities/carrito.entity").Carrito[]>;
}
