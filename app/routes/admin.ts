import { Request, Response, Router, } from 'express';
import { getUsers } from '../controllers/users.js';
import { AuthenticateToken } from '../middlewares/authentication.js';
import { IsAdmin } from '../middlewares/authorization.js';

const router: Router = Router();

router.get('/', AuthenticateToken, IsAdmin, (req: Request, res: Response) => {
    res.send('ADMIN ONLY ROUTE');
});

router.get('/users', AuthenticateToken, IsAdmin, getUsers);

export default router;
