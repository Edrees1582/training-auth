import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export const UserModel = sequelize.define('users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.INTEGER,
});

export enum UserRole {
  ADMIN = 0,
  MODERATOR,
  USER,
}
