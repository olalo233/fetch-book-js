import type {
	AuthToken,
	AuthTokenRepository,
} from "../../../infrastructure/repositories";

export interface AuthStrategy {
	verify(token: string): Promise<{ isValid: boolean; token?: AuthToken }>;
}

export class StaticTokenAuthStrategy implements AuthStrategy {
	constructor(private authTokenRepository: AuthTokenRepository) {}

	async verify(
		token: string,
	): Promise<{ isValid: boolean; token?: AuthToken }> {
		if (!token) {
			return { isValid: false };
		}

		const authToken = await this.authTokenRepository.findByToken(token);
		if (!authToken || !authToken.isActive) {
			return { isValid: false };
		}

		return { isValid: true, token: authToken };
	}
}
