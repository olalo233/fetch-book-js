
export interface Repository&lt;T, ID&gt; {
  findById(id: ID): Promise&lt;T | null&gt;;
  findAll(): Promise&lt;T[]&gt;;
  create(data: any): Promise&lt;T&gt;;
  update(id: ID, data: any): Promise&lt;T | null&gt;;
  delete(id: ID): Promise&lt;boolean&gt;;
}

export * from './NovelRepository';
export * from './ChapterRepository';
export * from './AuthTokenRepository';
export * from './PrismaNovelRepository';
export * from './PrismaChapterRepository';
export * from './PrismaAuthTokenRepository';

