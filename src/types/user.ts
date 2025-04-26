export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterUserDependencies = {
  hashPassword: (pw: string) => Promise<string>;
  findUserByEmail: (email: string) => Promise<User | null>;
  createUser: (
    username: string,
    email: string,
    hashed: string,
  ) => Promise<User>;
};

export type RegisterUserResponse = {
  success: boolean;
  user?: User;
  message?: string;
};