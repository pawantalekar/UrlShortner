import Express from 'express';
import urlRoutes from '../components/url/url.routes.ts';

const router = Express.Router();

router.get('/', (req, res) => {
    res.send(" API is running");
});

// Mount URL routes
router.use('/', urlRoutes);

export default router;