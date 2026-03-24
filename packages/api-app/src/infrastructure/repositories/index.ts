export interface Repository<T, ID> {
	findById(id: ID): Promise<T | null>;
	findAll(): Promise<T[]>;
	// biome-ignore lint/suspicious/noExplicitAny: Generic repository intentionally uses any for data
	create(data: any): Promise<T>;
	// biome-ignore lint/suspicious/noExplicitAny: Generic repository intentionally uses any for data
	update(id: ID, data: any): Promise<T | null>;
	delete(id: ID): Promise<boolean>;
}

export * from "./NovelRepository";
export * from "./ChapterRepository";
export * from "./AuthTokenRepository";
export * from "./PrismaNovelRepository";
export * from "./PrismaChapterRepository";
export * from "./PrismaAuthTokenRepository";
