
import type { Repository } from './index';

export interface Novel {
  id: string;
  title: string;
  author?: string;
  tags: string[];
  description?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NovelRepository extends Repository&lt;Novel, string&gt; {
  findByUrl(url: string): Promise&lt;Novel | null&gt;;
}

