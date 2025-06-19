import { Request, Response, Router, } from 'express';
import { AuthenticateToken } from '../middlewares/authentication.js';
import { IsAdmin } from '../middlewares/authorization.js';

const router: Router = Router();

router.get('/', AuthenticateToken, IsAdmin, (req: Request, res: Response) => {
    res.send('ADMIN ONLY ROUTE');
});

export default router;
