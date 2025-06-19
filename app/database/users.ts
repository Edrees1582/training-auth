import { User } from '../models/User.js';

const users = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const getUserByEmail = (email: string): User | null => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    return null;
  }

  return user;
};
