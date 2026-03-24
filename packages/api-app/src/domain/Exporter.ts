import type { Chapter } from "../infrastructure/repositories/ChapterRepository";
import type { Novel } from "../infrastructure/repositories/NovelRepository";

export interface Exporter {
	format: "txt" | "epub";
	export(
		novel: Novel,
		chapters: Chapter[],
	): Promise<ReadableStream<Uint8Array>>;
}

export class ExporterRegistry {
	private exporters = new Map<string, Exporter>();

	register(exporter: Exporter): void {
		this.exporters.set(exporter.format, exporter);
	}

	get(format: string): Exporter | undefined {
		return this.exporters.get(format);
	}

	listFormats(): string[] {
		return Array.from(this.exporters.keys());
	}
}

export const exporterRegistry = new ExporterRegistry();
