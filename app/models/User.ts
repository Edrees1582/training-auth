export interface User {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export enum UserRole {
  ADMIN = 0,
  MODERATOR,
  USER,
}
