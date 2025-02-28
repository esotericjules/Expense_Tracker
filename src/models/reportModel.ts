import { pool } from '../database/config/db';
import QUERIES from '../queries';
import { MonthlyExpenses } from '../types/report';

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
