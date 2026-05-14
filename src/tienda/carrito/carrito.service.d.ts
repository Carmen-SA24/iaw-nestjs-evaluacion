import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
export declare class CarritoService {
    private readonly carritoRepository;
    constructor(carritoRepository: Repository<Carrito>);
    create(createCarritoDto: CreateCarritoDto, usuarioId: number): Promise<Carrito>;
    findAll(): Promise<Carrito[]>;
    findByUsuario(usuarioId: number): Promise<Carrito[]>;
    findOne(id: number): Promise<Carrito>;
    update(id: number, updateCarritoDto: UpdateCarritoDto): Promise<Carrito>;
    remove(id: number): Promise<Carrito>;
    pagar(usuarioId: number): Promise<Carrito[]>;
}
