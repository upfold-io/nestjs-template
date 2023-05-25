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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/prisma/prisma.service");
let IdentityService = class IdentityService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.identity.create({
            data: Object.assign(Object.assign({}, data), { salt: 'salt', last_login_at: new Date(), updated_at: new Date() }),
        });
    }
    async update(id, data) {
        const identity = await this.prisma.identity.update({ where: { id }, data });
        return identity;
    }
    async findOne(id) {
        const identity = await this.prisma.identity.findUnique({ where: { id } });
        return identity;
    }
    async findAll() {
        const identities = await this.prisma.identity.findMany();
        return identities;
    }
    async findOneByCondition(condition) {
        const identity = await this.prisma.identity.findUnique({ where: condition });
        return identity;
    }
    async delete(id) {
        const identity = await this.prisma.identity.delete({ where: { id } });
        return !!identity;
    }
};
IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdentityService);
exports.IdentityService = IdentityService;
//# sourceMappingURL=identity.service.js.map