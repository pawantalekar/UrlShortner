import { Router } from 'express';
import urlController from './controller/url.controller.ts';

const router = Router();

// Create short URL
router.post('/shorten', urlController.createShortUrl.bind(urlController));

// Get analytics for a short URL
router.get('/analytics/:shortCode', urlController.getAnalytics.bind(urlController));

// Redirect to original URL (should be last to avoid conflicts)
router.get('/:shortCode', urlController.redirectToOriginalUrl.bind(urlController));

export default router;
