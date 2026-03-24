import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { PrismaClient } from "@prisma/client";
import { exporterRegistry } from "../../domain/Exporter";

const prisma = new PrismaClient();

export async function exportNovelCommand(
	novelId: string,
	outputPath: string,
	format: "txt" | "epub" = "txt",
) {
	try {
		const novel = await prisma.novel.findUnique({
			where: { id: novelId },
		});

		if (!novel) {
			console.error(`Novel with id ${novelId} not found`);
			process.exit(1);
		}

		const chapters = await prisma.chapter.findMany({
			where: { novelId },
			orderBy: { index: "asc" },
		});

		const exporter = exporterRegistry.get(format);
		if (!exporter) {
			console.error(`Unsupported format: ${format}`);
			process.exit(1);
		}

		const stream = await exporter.export(
			{
				id: novel.id,
				title: novel.title,
				author: novel.author ?? undefined,
				tags: JSON.parse(novel.tags) as string[],
				description: novel.description ?? undefined,
				url: novel.url,
				createdAt: novel.createdAt,
				updatedAt: novel.updatedAt,
			},
			chapters,
		);

		const fileStream = createWriteStream(outputPath);
		await pipeline(stream, fileStream);

		console.log(`Successfully exported to ${outputPath}`);
	} finally {
		await prisma.$disconnect();
	}
}
