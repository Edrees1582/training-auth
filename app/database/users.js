const users = [];

export const addUser = (user) => {
  users.push(user);
};

export const getUsers = () => {
  return users;
};

export const getUserByEmail = (email) => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    return null;
  }

  return user;
};
