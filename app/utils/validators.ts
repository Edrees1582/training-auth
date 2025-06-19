export const validateEmail = (email: string): boolean => {
  const regex = new RegExp(/^\S+@\S+\.\S+$/);

  return regex.test(email);
};
