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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const identity_service_1 = require("../identity/identity.service");
const logger_service_1 = require("../shared/logger/logger.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(logger = new common_1.Logger(AuthService_1.name), jwtService, identityService) {
        this.logger = logger;
        this.jwtService = jwtService;
        this.identityService = identityService;
    }
    async login(body) {
        const identity = await this.identityService.findOneByCondition({
            email_address: body.email_address,
        });
        if (!identity) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const payload = { id: identity.id };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        this.logger.log(`User ${identity.id} logged in`);
        return { accessToken, refreshToken };
    }
    async register(body) {
        try {
            return await this.identityService.create(body);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('Credentials already exists');
            }
            throw error;
        }
    }
    async updateRefreshToken(identityId, refreshToken) {
        const hashedRefreshToken = await argon2_1.default.hash(refreshToken);
        await this.identityService.update(identityId, {
            refresh_token: hashedRefreshToken,
        });
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        jwt_1.JwtService,
        identity_service_1.IdentityService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map