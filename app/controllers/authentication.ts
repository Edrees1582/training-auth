import { NextFunction, Request, Response } from 'express';
import { addUser, getUserByEmail } from '../database/users.js';
import { User } from '../models/User.js';
import { comparePassword, hashPassword } from '../utils/encryption.js';
import { generateToken } from '../utils/jwt.js';
import { validateEmail } from '../utils/validators.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, role, password } = req.body;

    const user: User = { name, email, role, password };

    const userExists = await getUserByEmail(email);

    if (userExists) {
      return next(res.status(400).json({ message: 'User already exists' }));
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;

    await addUser(user);

    return next(res.status(201).json({ message: 'User registered successfully' }));
  } catch (error) {
    next(res.status(500).json({ message: error.message ?? 'Internal server error' }));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      return next(res.status(400).json({ message: 'Invalid email' }));
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return next(res.status(401).json({ message: 'Invalid credentials' }));
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return next(res.status(401).json({ message: 'Invalid credentials' }));
    }

    const token = generateToken({ email, role: user.role });

    return next(res.status(200).json({ token }));
  } catch (error) {
    next(res.status(500).json({ message: error.message ?? 'Internal server error' }));
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req['user'] as User;

    const user = await getUserByEmail(email);

    delete user.password;

    return next(res.status(200).json(user));
  } catch (error) {
    return next(res.status(500).json({ message: error.message ?? 'Internal server error' }));
  }
};
