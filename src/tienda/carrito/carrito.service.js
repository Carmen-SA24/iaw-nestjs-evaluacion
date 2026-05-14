"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const carrito_entity_1 = require("./entities/carrito.entity");
let CarritoService = class CarritoService {
    carritoRepository;
    constructor(carritoRepository) {
        this.carritoRepository = carritoRepository;
    }
    async create(createCarritoDto, usuarioId) {
        const existente = await this.carritoRepository.findOne({
            where: {
                usuarioId,
                productoId: createCarritoDto.productoId,
                pagado: false,
            },
        });
        if (existente) {
            existente.cantidad += createCarritoDto.cantidad || 1;
            return this.carritoRepository.save(existente);
        }
        const carrito = this.carritoRepository.create({
            ...createCarritoDto,
            cantidad: createCarritoDto.cantidad || 1,
            usuarioId,
        });
        return this.carritoRepository.save(carrito);
    }
    findAll() {
        return this.carritoRepository.find();
    }
    findByUsuario(usuarioId) {
        return this.carritoRepository.find({
            where: { usuarioId, pagado: false },
        });
    }
    async findOne(id) {
        const carrito = await this.carritoRepository.findOneBy({ id });
        if (!carrito) {
            throw new common_1.NotFoundException(`Carrito con id ${id} no encontrado`);
        }
        return carrito;
    }
    async update(id, updateCarritoDto) {
        const carrito = await this.findOne(id);
        Object.assign(carrito, updateCarritoDto);
        return this.carritoRepository.save(carrito);
    }
    async remove(id) {
        const carrito = await this.findOne(id);
        return this.carritoRepository.remove(carrito);
    }
    async pagar(usuarioId) {
        const items = await this.carritoRepository.find({
            where: { usuarioId, pagado: false },
        });
        if (items.length === 0) {
            throw new common_1.NotFoundException('No hay items pendientes de pago');
        }
        const fecha = new Date();
        for (const item of items) {
            item.pagado = true;
            item.fechaPago = fecha;
        }
        return this.carritoRepository.save(items);
    }
};
exports.CarritoService = CarritoService;
exports.CarritoService = CarritoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carrito_entity_1.Carrito)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarritoService);
//# sourceMappingURL=carrito.service.js.map