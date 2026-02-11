import { Url, UrlClick } from '../models/url.ts';

export class UrlDao {
    async findByShortCode(shortCode: string): Promise<Url | null> {
        return await Url.findOne({ where: { shortCode } });
    }

    async createUrl(shortCode: string, originalUrl: string): Promise<Url> {
        return await Url.create({
            shortCode,
            originalUrl,
        });
    }

    async createUrlClick(urlId: string): Promise<void> {
        await UrlClick.create({ urlId });
    }

    async findUrlWithClicks(shortCode: string): Promise<Url | null> {
        return await Url.findOne({
            where: { shortCode },
            include: [{ model: UrlClick, as: 'clicks' }],
        });
    }
}

export default new UrlDao();