export class FetchBookApiClient {
	private baseUrl: string;
	private token: string | null;

	constructor(baseUrl: string, token: string | null = null) {
		this.baseUrl = baseUrl;
		this.token = token;
	}

	setBaseUrl(url: string) {
		this.baseUrl = url;
	}

	setToken(token: string | null) {
		this.token = token;
	}

	private async request<T>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		path: string,
		body?: unknown,
	): Promise<T> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (this.token) {
			headers['Authorization'] = `Bearer ${this.token}`;
		}

		const response = await fetch(`${this.baseUrl}${path}`, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		return response.json();
	}

	async getNovels() {
		return this.request<{ id: string; title: string }[]>('GET', '/api/novels');
	}

	async createNovel(data: { url: string }) {
		return this.request<{ id: string }>('POST', '/api/novels', data);
	}

	async getNovel(id: string) {
		return this.request<{ id: string; title: string }>('GET', `/api/novels/${id}`);
	}

	async updateNovel(id: string, data: { title?: string }) {
		return this.request<{ id: string }>('PUT', `/api/novels/${id}`, data);
	}

	async deleteNovel(id: string) {
		return this.request<void>('DELETE', `/api/novels/${id}`);
	}

	async getChapters(novelId: string) {
		return this.request<{ id: string; title: string }[]>('GET', `/api/novels/${novelId}/chapters`);
	}

	async getChapter(novelId: string, chapterId: string) {
		return this.request<{ id: string; title: string; content: string }>('GET', `/api/novels/${novelId}/chapters/${chapterId}`);
	}

	async createChapter(novelId: string, data: { url: string }) {
		return this.request<{ id: string }>('POST', `/api/novels/${novelId}/chapters`, data);
	}

	async updateChapter(novelId: string, chapterId: string, data: { title?: string; content?: string }) {
		return this.request<{ id: string }>('PUT', `/api/novels/${novelId}/chapters/${chapterId}`, data);
	}

	async deleteChapter(novelId: string, chapterId: string) {
		return this.request<void>('DELETE', `/api/novels/${novelId}/chapters/${chapterId}`);
	}
}
