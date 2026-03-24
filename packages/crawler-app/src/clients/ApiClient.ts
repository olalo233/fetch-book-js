export class ApiClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async createNovel(data: { title: string; author: string; url: string }) {
    return this.request('/api/novels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createChapter(novelId: string, data: { title: string; url: string; content: string }) {
    return this.request(`/api/novels/${novelId}/chapters`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
