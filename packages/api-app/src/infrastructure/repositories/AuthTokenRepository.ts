import type { Repository } from "./index";

export interface AuthToken {
	id: string;
	token: string;
	name: string;
	isActive: boolean;
	createdAt: Date;
}

export interface AuthTokenRepository extends Repository<AuthToken, string> {
	findByToken(token: string): Promise<AuthToken | null>;
}
