import { pool } from '../database/config/db';
import QUERIES from '../queries/index';
import { CategoryApiResponse } from '../types/category';
import { Expense, ExpenseApiResponse } from '../types/expense';

export const createExpense = async (
  expense: Expense,
): Promise<CategoryApiResponse> => {
  const result = await pool.query(QUERIES.CREATE_EXPENSE, [
    ...Object.values(expense),
  ]);
  return result.rows[0];
};

export const getExpenseById = async (
  id: string,
): Promise<ExpenseApiResponse> => {
  const result = await pool.query(QUERIES.GET_EXPENSE_BY_ID, [id]);
  return result.rows[0];
};

export const getAllExpenses = async (): Promise<ExpenseApiResponse[]> => {
  const result = await pool.query(QUERIES.GET_ALL_EXPENSES);
  return result.rows;
};

export const updateExpense = async (
  expense: Expense,
): Promise<ExpenseApiResponse> => {
  const { id, name, amount, description, categoryId } = expense;
  const result = await pool.query(QUERIES.UPDATE_EXPENSE, [
    name,
    amount,
    description,
    categoryId,
    id,
  ]);
  return result.rows[0];
};

export const deleteExpense = async (
  id: string,
): Promise<ExpenseApiResponse> => {
  const result = await pool.query(QUERIES.DELETE_EXPENSE, [id]);
  return result.rows[0];
};
