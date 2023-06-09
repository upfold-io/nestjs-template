import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISession } from '@/common/interfaces';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateSessionDto } from '../dto/session.dto';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  /**
   * Create a new session in the database.
   *
   * @param session - The session data transfer object containing all the necessary information to create a session.
   * @returns A promise that resolves to the created ISession object.
   */
  public async create(session: CreateSessionDto): Promise<ISession> {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    return await this.prisma.session.create({
      data: { ...session, expires_at: expirationDate } as any,
    });
  }

  /**
   * Find a session in the database using the provided refresh token.
   *
   * @param token - The refresh token to use to find the session.
   * @return <ISession | null> - The session if found, otherwise null.
   */
  public async findByRefreshToken(token: string): Promise<ISession | null> {
    return await this.prisma.session.findUnique({ where: { refresh_token: token } });
  }
}
