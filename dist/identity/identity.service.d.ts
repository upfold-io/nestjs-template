import { PrismaService } from '@/shared/prisma/prisma.service';
import { IIdentity } from './interface';
export declare class IdentityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<IIdentity>;
    update(id: string, data: any): Promise<IIdentity>;
    findOne(id: string): Promise<IIdentity>;
    findAll(): Promise<IIdentity[]>;
    findOneByCondition(condition: any): Promise<IIdentity>;
    delete(id: string): Promise<boolean>;
}
