
import type { PrismaClient } from '@prisma/client';
import type { Chapter, ChapterRepository } from './ChapterRepository';

export class PrismaChapterRepository implements ChapterRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise&lt;Chapter | null&gt; {
    const chapter = await this.prisma.chapter.findUnique({ where: { id } });
    return chapter ? this.toModel(chapter) : null;
  }

  async findAll(): Promise&lt;Chapter[]&gt; {
    const chapters = await this.prisma.chapter.findMany();
    return chapters.map(this.toModel);
  }

  async findByNovelId(novelId: string): Promise&lt;Chapter[]&gt; {
    const chapters = await this.prisma.chapter.findMany({ where: { novelId }, orderBy: { index: 'asc' } });
    return chapters.map(this.toModel);
  }

  async findByNovelIdAndIndex(novelId: string, index: number): Promise&lt;Chapter | null&gt; {
    const chapter = await this.prisma.chapter.findFirst({ where: { novelId, index } });
    return chapter ? this.toModel(chapter) : null;
  }

  async create(data: Omit&lt;Chapter, 'id' | 'createdAt'&gt;): Promise&lt;Chapter&gt; {
    const chapter = await this.prisma.chapter.create({ data });
    return this.toModel(chapter);
  }

  async update(id: string, data: Partial&lt;Omit&lt;Chapter, 'id' | 'createdAt'&gt;&gt;): Promise&lt;Chapter | null&gt; {
    try {
      const chapter = await this.prisma.chapter.update({ where: { id }, data });
      return this.toModel(chapter);
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise&lt;boolean&gt; {
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

