
import type { PrismaClient } from '@prisma/client';
import type { Chapter, ChapterRepository } from './ChapterRepository';

export class PrismaChapterRepository implements ChapterRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Chapter | null> {
    const chapter = await this.prisma.chapter.findUnique({ where: { id } });
    return chapter ? this.toModel(chapter) : null;
  }

  async findAll(): Promise<Chapter[]> {
    const chapters = await this.prisma.chapter.findMany();
    return chapters.map(this.toModel);
  }

  async findByNovelId(novelId: string): Promise<Chapter[]> {
    const chapters = await this.prisma.chapter.findMany({ where: { novelId }, orderBy: { index: 'asc' } });
    return chapters.map(this.toModel);
  }

  async findByNovelIdAndIndex(novelId: string, index: number): Promise<Chapter | null> {
    const chapter = await this.prisma.chapter.findFirst({ where: { novelId, index } });
    return chapter ? this.toModel(chapter) : null;
  }

  async create(data: Omit<Chapter, 'id' | 'createdAt'>): Promise<Chapter> {
    const chapter = await this.prisma.chapter.create({ data });
    return this.toModel(chapter);
  }

  async update(id: string, data: Partial<Omit<Chapter, 'id' | 'createdAt'>>): Promise<Chapter | null> {
    try {
      const chapter = await this.prisma.chapter.update({ where: { id }, data });
      return this.toModel(chapter);
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.chapter.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  private toModel(db: any): Chapter {
    return {
      id: db.id,
      novelId: db.novelId,
      index: db.index,
      title: db.title,
      content: db.content,
      url: db.url,
      createdAt: db.createdAt,
    };
  }
}

