import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthService } from '@/auth/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: any): Promise<void>;
}
export {};
