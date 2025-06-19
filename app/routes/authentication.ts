import { Router } from 'express';
import { getProfile, login, register } from '../controllers/authentication.js';
import { AuthenticateToken } from '../middlewares/authentication.js';
import { loginValidation, registerValidation } from '../validators/authentication.js';

const router: Router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', AuthenticateToken, getProfile);

export default router;
