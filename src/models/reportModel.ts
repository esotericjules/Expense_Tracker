import { pool } from '../database/config/db';
import QUERIES from '../queries';
import {
  MonthlyExpenses,
  CategoryExpenses,
  YearlyExpenses,
} from '../types/report';

export const getTotalMonthlyExpense = async (
  year: number,
  userId: number,
): Promise<MonthlyExpenses[]> => {
  const result = await pool.query(QUERIES.FETCH_MONTHLY_EXPENSES_REPORT, [
    year,
    userId,
  ]);
  return result.rows;
};

export const getCategoryExpensesByMonthYear = async (
  year: number,
  month: number,
  userId: number,
): Promise<CategoryExpenses[]> => {
  const result = await pool.query(QUERIES.FETCH_CATEGORY_TOTALS_FOR_MONTH, [
    year,
    month,
    userId,
  ]);
  return result.rows;
};

export const getYearlyExpenses = async (
  userId: number,
): Promise<YearlyExpenses[]> => {
  const result = await pool.query(QUERIES.FETCH_YEARLY_EXPENSES_REPORT, [
    userId,
  ]);
  return result.rows;
};
