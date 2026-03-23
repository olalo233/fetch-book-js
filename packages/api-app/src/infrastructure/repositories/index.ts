
export interface Repository&lt;T, ID&gt; {
  findById(id: ID): Promise&lt;T | null&gt;;
  findAll(): Promise&lt;T[]&gt;;
  create(data: Omit&lt;T, 'id' | 'createdAt' | 'updatedAt'&gt;): Promise&lt;T&gt;;
  update(id: ID, data: Partial&lt;Omit&lt;T, 'id' | 'createdAt' | 'updatedAt'&gt;&gt;): Promise&lt;T | null&gt;;
  delete(id: ID): Promise&lt;boolean&gt;;
}

export * from './NovelRepository';
export * from './ChapterRepository';
export * from './AuthTokenRepository';

