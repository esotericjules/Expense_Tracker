export type Expense = {
  id: string;
  name: string;
  amount: number;
  description?: string;
  categoryId: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ExpenseApiResponse = {
  id: string;
  name: string;
  amount: number;
  description?: string;
  category_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};
