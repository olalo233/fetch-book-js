import type { Novel } from "../infrastructure/repositories/NovelRepository";
import type { Chapter } from "../infrastructure/repositories/ChapterRepository";
import type { Exporter } from "./Exporter";
import { exporterRegistry } from "./Exporter";
import { Epubook } from "epubook";

export class EpubExporter implements Exporter {
	format = "epub" as const;

	async export(novel: Novel, chapters: Chapter[]): Promise<ReadableStream<Uint8Array>> {
		const book = await Epubook.create({
			title: novel.title,
			description: novel.description || "",
			language: "zh-CN",
			author: novel.author ? [{ name: novel.author }] : [{ name: "Unknown Author" }],
		});

		// Add chapters
		const chapterPages = chapters.map((chapter) => {
			return book.page("chapter", {
				title: chapter.title,
				content: chapter.content.replace(/\n/g, "<br/>"),
			});
		});

		book.spine(...chapterPages);
		book.toc(...chapterPages);

		const buffer = await book.bundle();

		// Convert buffer to ReadableStream
		return new ReadableStream({
			start(controller) {
				controller.enqueue(buffer);
				controller.close();
			},
		});
	}
}

exporterRegistry.register(new EpubExporter());
