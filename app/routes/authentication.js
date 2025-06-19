import express from 'express';
import { getProfile, login, register } from '../controllers/authentication.js';
import { AuthenticateToken } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', AuthenticateToken, getProfile);

export default router;
