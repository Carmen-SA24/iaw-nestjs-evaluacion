export declare class User {
    id: number;
    email: string;
    password: string;
    nombre: string;
    rol: string;
    hashPassword(): Promise<void>;
}
