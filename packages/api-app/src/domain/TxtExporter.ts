import type { Novel } from "../infrastructure/repositories/NovelRepository";
import type { Chapter } from "../infrastructure/repositories/ChapterRepository";
import type { Exporter } from "./Exporter";
import { exporterRegistry } from "./Exporter";

const encoder = new TextEncoder();

export class TxtExporter implements Exporter {
	format = "txt" as const;

	async export(novel: Novel, chapters: Chapter[]): Promise<ReadableStream<Uint8Array>> {
		return new ReadableStream({
			start(controller) {
				// Write novel title
				controller.enqueue(encoder.encode(`# ${novel.title}\n`));
				if (novel.author) {
					controller.enqueue(encoder.encode(`作者: ${novel.author}\n`));
				}
				if (novel.tags.length > 0) {
					controller.enqueue(encoder.encode(`标签: ${novel.tags.join(", ")}\n`));
				}
				controller.enqueue(encoder.encode("\n"));

				// Write chapters
				for (const chapter of chapters) {
					controller.enqueue(encoder.encode(`## ${chapter.title}\n`));
					controller.enqueue(encoder.encode(chapter.content));
					controller.enqueue(encoder.encode("\n\n"));
				}

				controller.close();
			},
		});
	}
}

exporterRegistry.register(new TxtExporter());
