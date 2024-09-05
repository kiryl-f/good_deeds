import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<import("../users/users.entity").User>;
    getProfile(req: any): any;
}
