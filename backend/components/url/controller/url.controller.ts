import type { Request, Response } from 'express';
import urlService from '../Services/url.service.ts';

export class UrlController {
    async createShortUrl(req: Request, res: Response) {
        try {
            const { url, customCode } = req.body;

            if (!url) {
                return res.status(400).json({ error: 'URL is required' });
            }

            const shortUrl = await urlService.createShortUrl(url, customCode);

            res.status(201).json({
                success: true,
                data: {
                    shortCode: shortUrl.shortCode,
                    originalUrl: shortUrl.originalUrl,
                    shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl.shortCode}`,
                    createdAt: shortUrl.createdAt,
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async redirectToOriginalUrl(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;

            const url = await urlService.getUrlByShortCode(shortCode as string);

            if (!url) {
                return res.status(404).json({ error: 'Short URL not found' });
            }

            // Log the click
            await urlService.logClick(url.id);

            // Redirect to original URL
            res.redirect(url.originalUrl);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAnalytics(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;

            const analytics = await urlService.getAnalytics(shortCode as string);

            if (!analytics) {
                return res.status(404).json({ error: 'Short URL not found' });
            }

            res.json({
                success: true,
                data: analytics,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UrlController();
