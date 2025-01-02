export type Category = {
  id: string;
  name: string;
  description?: string;
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryApiResponse = {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};