import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { healthRouter } from './modules/health/routes';
import { createNovelRouter } from './modules/novel/routes';
import { PrismaNovelRepository, PrismaChapterRepository, PrismaAuthTokenRepository } from './infrastructure/repositories';
import { StaticTokenAuthStrategy, createAuthMiddleware } from './modules/auth';

const prisma = new PrismaClient();
const app = new Hono();

app.use(errorHandler());

app.route('/api/health', healthRouter);

const authTokenRepository = new PrismaAuthTokenRepository(prisma);
const authStrategy = new StaticTokenAuthStrategy(authTokenRepository);
const authMiddleware = createAuthMiddleware(authStrategy);

const novelRepository = new PrismaNovelRepository(prisma);
const chapterRepository = new PrismaChapterRepository(prisma);
const novelRouter = createNovelRouter({ novelRepository, chapterRepository });

app.use('/api/novels/*', authMiddleware);
app.route('/api/novels', novelRouter);

app.notFound(notFoundHandler());

const port = process.env.PORT || 3000;

console.log(`Server starting on port ${port}...`);

export default {
  port,
  fetch: app.fetch,
};
