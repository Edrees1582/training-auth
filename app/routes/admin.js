import express from 'express';
import { AuthenticateToken } from '../middlewares/authentication.js';
import { IsAdmin } from '../middlewares/authorization.js';

const router = express.Router();

router.get('/', AuthenticateToken, IsAdmin, (req, res) => {
    res.send('ADMIN ONLY ROUTE');
});

export default router;
