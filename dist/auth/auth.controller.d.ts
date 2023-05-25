import { AuthService } from '@/auth/auth.service';
import { AuthDTO, RegisterDTO } from '@/auth/dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(req: any, res: any, body: RegisterDTO): Promise<import("../identity/interface").IIdentity>;
    login(req: any, res: any, body: AuthDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(): void;
    refreshTokens(): void;
}
