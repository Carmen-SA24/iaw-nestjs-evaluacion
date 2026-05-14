import { User } from '../../../auth/entities/user.entity';
import { Producto } from '../../producto/entities/producto.entity';
export declare class Carrito {
    id: number;
    usuario: User;
    usuarioId: number;
    producto: Producto;
    productoId: number;
    cantidad: number;
    fechaPago: Date;
    pagado: boolean;
}
