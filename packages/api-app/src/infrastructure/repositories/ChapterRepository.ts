
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

export interface ChapterRepository extends Repository&lt;Chapter, string&gt; {
  findByNovelId(novelId: string): Promise&lt;Chapter[]&gt;;
  findByNovelIdAndIndex(novelId: string, index: number): Promise&lt;Chapter | null&gt;;
}

