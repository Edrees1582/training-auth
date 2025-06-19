import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const AuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(res.sendStatus(401));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(res.sendStatus(403));

    req['user'] = user;
    
    return next();
  });
};
