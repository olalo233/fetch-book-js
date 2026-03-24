import type { PrismaClient } from "@prisma/client";
import type { Novel, NovelRepository } from "./NovelRepository";

export class PrismaNovelRepository implements NovelRepository {
	constructor(private prisma: PrismaClient) {}

	async findById(id: string): Promise<Novel | null> {
		const novel = await this.prisma.novel.findUnique({ where: { id } });
		return novel ? this.toModel(novel) : null;
	}

	async findAll(): Promise<Novel[]> {
		const novels = await this.prisma.novel.findMany();
		return novels.map(this.toModel);
	}

	async findByUrl(url: string): Promise<Novel | null> {
		const novel = await this.prisma.novel.findUnique({ where: { url } });
		return novel ? this.toModel(novel) : null;
	}

	async create(
		data: Omit<Novel, "id" | "createdAt" | "updatedAt">,
	): Promise<Novel> {
		const novel = await this.prisma.novel.create({
			data: {
				...data,
				tags: JSON.stringify(data.tags),
			},
		});
		return this.toModel(novel);
	}

	async update(
		id: string,
		data: Partial<Omit<Novel, "id" | "createdAt" | "updatedAt">>,
	): Promise<Novel | null> {
		try {
			// biome-ignore lint/suspicious/noExplicitAny: Update data needs to handle partial tags serialization
			const updateData: any = { ...data };
			if (data.tags !== undefined) {
				updateData.tags = JSON.stringify(data.tags);
			}
			const novel = await this.prisma.novel.update({
				where: { id },
				data: updateData,
			});
			return this.toModel(novel);
		} catch {
			return null;
		}
	}

	async delete(id: string): Promise<boolean> {
		try {
			await this.prisma.novel.delete({ where: { id } });
			return true;
		} catch {
			return false;
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: Prisma model type is not exported, use any for conversion
	private toModel(db: any): Novel {
		return {
			id: db.id,
			title: db.title,
			author: db.author,
			tags: JSON.parse(db.tags),
			description: db.description,
			url: db.url,
			createdAt: db.createdAt,
			updatedAt: db.updatedAt,
		};
	}
}
