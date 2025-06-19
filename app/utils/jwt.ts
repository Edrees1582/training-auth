import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User.js';

export const generateToken = (payload: {
  email: string;
  role: UserRole;
}): string => {
  try {
    const token: string = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    throw new Error('Failed to generate token', error);
  }
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    throw new Error('Invalid token', error);
  }
};
