import express from 'express';
import { AuthenticateToken } from '../middlewares/authentication.js';
import { IsModerator } from '../middlewares/authorization.js';

const router = express.Router();

router.get('/', AuthenticateToken, IsModerator, (req, res) => {
    res.send('MODERATOR ONLY ROUTE');
});

export default router;
