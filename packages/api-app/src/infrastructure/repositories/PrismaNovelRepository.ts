
import type { PrismaClient } from '@prisma/client';
import type { Novel, NovelRepository } from './NovelRepository';

export class PrismaNovelRepository implements NovelRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise&lt;Novel | null&gt; {
    const novel = await this.prisma.novel.findUnique({ where: { id } });
    return novel ? this.toModel(novel) : null;
  }

  async findAll(): Promise&lt;Novel[]&gt; {
    const novels = await this.prisma.novel.findMany();
    return novels.map(this.toModel);
  }

  async findByUrl(url: string): Promise&lt;Novel | null&gt; {
    const novel = await this.prisma.novel.findUnique({ where: { url } });
    return novel ? this.toModel(novel) : null;
  }

  async create(data: Omit&lt;Novel, 'id' | 'createdAt' | 'updatedAt'&gt;): Promise&lt;Novel&gt; {
    const novel = await this.prisma.novel.create({ data });
    return this.toModel(novel);
  }

  async update(id: string, data: Partial&lt;Omit&lt;Novel, 'id' | 'createdAt' | 'updatedAt'&gt;&gt;): Promise&lt;Novel | null&gt; {
    try {
      const novel = await this.prisma.novel.update({ where: { id }, data });
      return this.toModel(novel);
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise&lt;boolean&gt; {
    try {
      await this.prisma.novel.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  private toModel(db: any): Novel {
    return {
      id: db.id,
      title: db.title,
      author: db.author,
      tags: db.tags,
      description: db.description,
      url: db.url,
      createdAt: db.createdAt,
      updatedAt: db.updatedAt,
    };
  }
}

