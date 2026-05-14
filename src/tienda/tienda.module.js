"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiendaModule = void 0;
const common_1 = require("@nestjs/common");
const producto_module_1 = require("./producto/producto.module");
const carrito_module_1 = require("./carrito/carrito.module");
let TiendaModule = class TiendaModule {
};
exports.TiendaModule = TiendaModule;
exports.TiendaModule = TiendaModule = __decorate([
    (0, common_1.Module)({
        imports: [producto_module_1.ProductoModule, carrito_module_1.CarritoModule]
    })
], TiendaModule);
//# sourceMappingURL=tienda.module.js.map