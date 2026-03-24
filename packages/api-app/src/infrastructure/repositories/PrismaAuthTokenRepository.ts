
import type { PrismaClient } from '@prisma/client';
import type { AuthToken, AuthTokenRepository } from './AuthTokenRepository';

export class PrismaAuthTokenRepository implements AuthTokenRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<AuthToken | null> {
    const token = await this.prisma.authToken.findUnique({ where: { id } });
    return token ? this.toModel(token) : null;
  }

  async findAll(): Promise<AuthToken[]> {
    const tokens = await this.prisma.authToken.findMany();
    return tokens.map(this.toModel);
  }

  async findByToken(token: string): Promise<AuthToken | null> {
    const authToken = await this.prisma.authToken.findUnique({ where: { token } });
    return authToken ? this.toModel(authToken) : null;
  }

  async create(data: Omit<AuthToken, 'id' | 'createdAt'>): Promise<AuthToken> {
    const token = await this.prisma.authToken.create({ data });
    return this.toModel(token);
  }

  async update(id: string, data: Partial<Omit<AuthToken, 'id' | 'createdAt'>>): Promise<AuthToken | null> {
    try {
      const token = await this.prisma.authToken.update({ where: { id }, data });
      return this.toModel(token);
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.authToken.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  private toModel(db: any): AuthToken {
    return {
      id: db.id,
      token: db.token,
      name: db.name,
      isActive: db.isActive,
      createdAt: db.createdAt,
    };
  }
}

