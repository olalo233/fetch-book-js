export interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: any): Promise<T>;
  update(id: ID, data: any): Promise<T | null>;
  delete(id: ID): Promise<boolean>;
}

export * from './NovelRepository';
export * from './ChapterRepository';
export * from './AuthTokenRepository';
export * from './PrismaNovelRepository';
export * from './PrismaChapterRepository';
export * from './PrismaAuthTokenRepository';
