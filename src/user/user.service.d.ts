import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    findById(id: number): Promise<User | null>;
}
