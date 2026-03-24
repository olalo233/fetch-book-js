
import type { Repository } from './index';

export interface Chapter {
  id: string;
  novelId: string;
  index: number;
  title: string;
  content: string;
  url: string;
  createdAt: Date;
}

export interface ChapterRepository extends Repository<Chapter, string> {
  findByNovelId(novelId: string): Promise<Chapter[]>;
  findByNovelIdAndIndex(novelId: string, index: number): Promise<Chapter | null>;
}

