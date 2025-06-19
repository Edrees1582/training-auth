import { NextFunction, Request, Response } from 'express';

import { Op } from 'sequelize';
import { UserModel, UserRole } from '../models/User.js';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 0, limit = 5, search = '' } = req.query;

    const role = getRoleId(search.toString().toLowerCase());

    const { count, rows } = await UserModel.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { role: { [Op.like]: `%${role}%` } },
        ],
      },
      limit: Number(limit),
      offset: Number(page) * Number(limit),
    });

    return next(res.status(200).json({ count, users: rows }));
  } catch (error) {
    return next(
      res
        .status(500)
        .json({ message: error.message ?? 'Internal server error' })
    );
  }
};

const getRoleId = (role: string): UserRole => {
  if (role.toLowerCase().includes('admin')) {
    return UserRole.ADMIN;
  } else if (role.toLowerCase().includes('moderator')) {
    return UserRole.MODERATOR;
  } else if (role.toLowerCase().includes('user')) {
    return UserRole.USER;
  }
};
