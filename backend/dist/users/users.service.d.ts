import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneByUsername(username: string): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
}
