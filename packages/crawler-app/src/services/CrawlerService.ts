import { HaxsMeAdapter } from '@fetch-book/shared';
import { ApiClient } from '../clients/ApiClient';

export class CrawlerService {
  private adapter: HaxsMeAdapter;
  private apiClient: ApiClient;

  constructor(apiBaseUrl: string, apiToken: string) {
    this.adapter = new HaxsMeAdapter();
    this.apiClient = new ApiClient(apiBaseUrl, apiToken);
  }

  async crawlNovel(url: string) {
    console.log(`Crawling novel from ${url}`);
    // TODO: Implement actual crawling logic using HaxsMeAdapter
    // 1. Fetch novel info
    // 2. Fetch chapters list
    // 3. Create novel via API
    // 4. Crawl each chapter and create via API
    throw new Error('Not implemented yet');
  }

  async crawlChapter(url: string) {
    console.log(`Crawling chapter from ${url}`);
    // TODO: Implement actual chapter crawling logic
    throw new Error('Not implemented yet');
  }
}
