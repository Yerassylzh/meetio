export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  password: string | null;
};

export type TokenUser = {
  name: string;
  email: string;
};
