import { Hono } from "hono";
import type {
	ChapterRepository,
	NovelRepository,
} from "../../infrastructure/repositories";

interface RoutesDeps {
	novelRepository: NovelRepository;
	chapterRepository: ChapterRepository;
}

export function createNovelRouter({
	novelRepository,
	chapterRepository,
}: RoutesDeps) {
	const router = new Hono();

	router.get("/", async (c) => {
		const novels = await novelRepository.findAll();
		return c.json({ success: true, data: novels });
	});

	router.get("/:id", async (c) => {
		const id = c.req.param("id");
		const novel = await novelRepository.findById(id);
		if (!novel) {
			return c.json(
				{
					success: false,
					error: { code: "NOT_FOUND", message: "Novel not found" },
				},
				404,
			);
		}
		return c.json({ success: true, data: novel });
	});

	router.post("/", async (c) => {
		const data = await c.req.json();
		const novel = await novelRepository.create(data);
		return c.json({ success: true, data: novel }, 201);
	});

	router.put("/:id", async (c) => {
		const id = c.req.param("id");
		const data = await c.req.json();
		const novel = await novelRepository.update(id, data);
		if (!novel) {
			return c.json(
				{
					success: false,
					error: { code: "NOT_FOUND", message: "Novel not found" },
				},
				404,
			);
		}
		return c.json({ success: true, data: novel });
	});

	router.delete("/:id", async (c) => {
		const id = c.req.param("id");
		const deleted = await novelRepository.delete(id);
		if (!deleted) {
			return c.json(
				{
					success: false,
					error: { code: "NOT_FOUND", message: "Novel not found" },
				},
				404,
			);
		}
		return c.json({ success: true, data: null });
	});

	router.get("/:id/chapters", async (c) => {
		const novelId = c.req.param("id");
		const chapters = await chapterRepository.findByNovelId(novelId);
		return c.json({ success: true, data: chapters });
	});

	router.get("/:id/chapters/:chapterId", async (c) => {
		const novelId = c.req.param("id");
		const chapterId = c.req.param("chapterId");
		const chapter = await chapterRepository.findById(chapterId);
		if (!chapter || chapter.novelId !== novelId) {
			return c.json(
				{
					success: false,
					error: { code: "NOT_FOUND", message: "Chapter not found" },
				},
				404,
			);
		}
		return c.json({ success: true, data: chapter });
	});

	router.post("/:id/chapters", async (c) => {
		const novelId = c.req.param("id");
		const data = await c.req.json();
		const chapter = await chapterRepository.create({ ...data, novelId });
		return c.json({ success: true, data: chapter }, 201);
	});

	router.put("/:id/chapters/:chapterId", async (c) => {
		const novelId = c.req.param("id");
		const chapterId = c.req.param("chapterId");
		const data = await c.req.json();

		const existing = await chapterRepository.findById(chapterId);
		if (!existing || existing.novelId !== novelId) {
			return c.json(
				{
					success: false,
					error: { code: "NOT_FOUND", message: "Chapter not found" },
				},
				404,
			);
		}

		const chapter = await chapterRepository.update(chapterId, data);
		return c.json({ success: true, data: chapter });
	});

	router.delete("/:id/chapters/:chapterId", async (c) => {
		const novelId = c.req.param("id");
		const chapterId = c.req.param("chapterId");

		const existing = await chapterRepository.findById(chapterId);
		if (!existing || existing.novelId !== novelId) {
			return c.json(
				{
					success: false,
					error: { code: "NOT_FOUND", message: "Chapter not found" },
				},
				404,
			);
		}

		const deleted = await chapterRepository.delete(chapterId);
		return c.json({ success: true, data: null });
	});

	return router;
}
