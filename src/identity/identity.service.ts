import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma/prisma.service';

import { CreateIdentityDTO } from './dto/create-identity.dto';
import { IIdentity } from './interface';

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any): Promise<IIdentity> {
    return await this.prisma.identity.create({
      data: {
        ...data,
        salt: 'salt',
        last_login_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async update(id: string, data: any): Promise<IIdentity> {
    const identity = await this.prisma.identity.update({ where: { id }, data });

    return identity;
  }

  async findOne(id: string): Promise<IIdentity> {
    const identity = await this.prisma.identity.findUnique({ where: { id } });

    return identity;
  }

  async findAll(): Promise<IIdentity[]> {
    const identities = await this.prisma.identity.findMany();

    return identities;
  }

  async findOneByCondition(condition: any): Promise<IIdentity> {
    const identity = await this.prisma.identity.findUnique({ where: condition });

    return identity;
  }

  async delete(id: string): Promise<boolean> {
    const identity = await this.prisma.identity.delete({ where: { id } });

    return !!identity;
  }
}
