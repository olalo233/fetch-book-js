import type { Repository } from "./index";

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

export interface NovelRepository extends Repository<Novel, string> {
	findByUrl(url: string): Promise<Novel | null>;
}
