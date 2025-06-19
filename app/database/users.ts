import { User, UserModel } from '../models/User.js';

export const addUser = (user: User) => {
  const newUser = UserModel.build({
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newUser.save();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  return user.get();
};
