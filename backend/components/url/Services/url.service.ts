import { Url } from '../models/url.ts';
import urlDao from '../Dao/urlDao.ts';
import { nanoid } from 'nanoid';

export class UrlService {
    async createShortUrl(originalUrl: string, customCode?: string): Promise<Url> {
        const shortCode = customCode || nanoid(8);

        // Check if short code already exists
        const existing = await urlDao.findByShortCode(shortCode);
        if (existing) {
            throw new Error('Short code already exists');
        }

        const url = await urlDao.createUrl(shortCode, originalUrl);

        return url;
    }

    async getUrlByShortCode(shortCode: string): Promise<Url | null> {
        return await urlDao.findByShortCode(shortCode);
    }

    async logClick(urlId: string): Promise<void> {
        await urlDao.createUrlClick(urlId);
    }

    async getAnalytics(shortCode: string) {
        const url = await urlDao.findUrlWithClicks(shortCode);

        if (!url) {
            return null;
        }

        return {
            shortCode: url.shortCode,
            originalUrl: url.originalUrl,
            createdAt: url.createdAt,
            totalClicks: (url as any).clicks?.length || 0,
            clicks: (url as any).clicks || [],
        };
    }
}

export default new UrlService();
