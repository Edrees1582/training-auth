import { NextFunction, Request, Response } from 'express';
import { User, UserRole } from '../models/User.js';

export const IsAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req['user'] as User;

  if (!user) return next(res.sendStatus(401));

  if (user.role !== UserRole.ADMIN) return next(res.sendStatus(403));

  return next();
};

export const IsModerator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req['user'] as User;

  if (!user) return next(res.sendStatus(401));

  if (user.role !== UserRole.MODERATOR) return next(res.sendStatus(403));

  return next();
};
