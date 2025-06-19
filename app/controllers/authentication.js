import {
  addUser,
  getUserByEmail,
} from '../database/users.js';
import { comparePassword, hashPassword } from '../utils/encryption.js';
import { generateToken } from '../utils/jwt.js';
import { ValidateEmail, ValidateRequiredFields } from '../utils/validators.js';

export const register = async (req, res) => {
  try {
    const { name, email, role, password } = ValidateRequiredFields(
      ['name', 'email', 'role', 'password'],
      req.body
    );

    const user = { name, email, role, password };

    const userExists = getUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;

    addUser(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message ?? 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = ValidateRequiredFields(
      ['email', 'password'],
      req.body
    );

    const isValidEmail = ValidateEmail(email);

    if (!isValidEmail) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const user = getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ email, role: user.role });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message ?? 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { email } = req.user;

    const user = getUserByEmail(email);

    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message ?? 'Internal server error' });
  }
};
