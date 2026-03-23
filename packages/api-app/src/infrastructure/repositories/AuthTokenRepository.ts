
import type { Repository } from './index';

export interface AuthToken {
  id: string;
  token: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthTokenRepository extends Repository&lt;AuthToken, string&gt; {
  findByToken(token: string): Promise&lt;AuthToken | null&gt;;
}

