import { pool } from '../database/config/db';
import QUERIES from '../queries/index';
import { Category } from '../types/category';

export const insertCategory = async (category: Category): Promise<Category> => {
  const result = await pool.query(QUERIES.CREATE_CATEGORY, [
    ...Object.values(category),
  ]);
  return result.rows[0];
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const result = await pool.query(QUERIES.GET_CATEGORY_BY_ID, [id]);
  return result.rows[0];
};

export const getCategoryByName = async (name: string): Promise<Category> => {
  const result = await pool.query(QUERIES.GET_CATEGORY_BY_NAME, [name]);
  return result.rows[0];
};
