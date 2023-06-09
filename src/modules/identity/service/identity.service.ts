import { Injectable } from '@nestjs/common';

import { generateHash, generateSalt } from '@common/helpers/security.helper';

import { Identity } from '@/common/entity';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateIdentityDto } from '../dto';
import { IIdentity } from '../interface';

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IIdentity[]> {
    return this.prisma.identity.findMany();
  }

  async findOne(id: string): Promise<IIdentity> {
    return this.prisma.identity.findUnique({ where: { id } });
  }

  async findOneByCondition(condition: any): Promise<IIdentity> {
    return this.prisma.identity.findUnique({ where: condition });
  }

  async create(createIdentityDto: CreateIdentityDto): Promise<IIdentity> {
    const salt = await generateSalt();
    const password = await generateHash(createIdentityDto.password, salt);

    return await this.prisma.identity.create({
      data: {
        ...createIdentityDto,
        password: password,
        salt: salt,
        last_login_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async update(id: string, data: any): Promise<IIdentity> {
    return this.prisma.identity.update({ where: { id }, data });
  }

  async delete(id: string): Promise<IIdentity> {
    return this.prisma.identity.delete({ where: { id } });
  }
}
