import { JwtService } from '@nestjs/jwt';
import { AuthDTO, RegisterDTO } from '@/auth/dto';
import { IdentityService } from '@/identity/identity.service';
import { IIdentity } from '@/identity/interface';
import { LoggerService } from '@/shared/logger/logger.service';
export declare class AuthService {
    private readonly logger;
    private jwtService;
    private identityService;
    constructor(logger: LoggerService, jwtService: JwtService, identityService: IdentityService);
    login(body: AuthDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(body: RegisterDTO): Promise<IIdentity>;
    updateRefreshToken(identityId: string, refreshToken: string): Promise<void>;
}
