import { body } from 'express-validator';
import { validate } from '../middlewares/validation.middleware.js';
import { UserRole } from '../models/User.js';

const emailValidation = body('email').isEmail().withMessage('Invalid email');
const passwordValidation = body('password')
  .isString()
  .isStrongPassword()
  .withMessage(
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'
  );

export const registerValidation = [
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  emailValidation,
  body('role')
    .isIn([UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER])
    .withMessage('Invalid role'),
  passwordValidation,
  validate,
];

export const loginValidation = [emailValidation, passwordValidation, validate];
