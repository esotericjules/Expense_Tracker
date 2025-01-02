import { pool } from '../database/config/db';
import QUERIES from '../queries/index';
import { Category, CategoryApiResponse } from '../types/category';

export const createCategory = async (
  category: Category,
): Promise<CategoryApiResponse> => {
  const result = await pool.query(QUERIES.CREATE_CATEGORY, [
    ...Object.values(category),
  ]);
  return result.rows[0];
};

export const getCategoryById = async (
  id: string,
): Promise<CategoryApiResponse> => {
  const result = await pool.query(QUERIES.GET_CATEGORY_BY_ID, [id]);
  return result.rows[0];
};

export const getCategoryByName = async (
  name: string,
): Promise<CategoryApiResponse> => {
  const result = await pool.query(QUERIES.GET_CATEGORY_BY_NAME, [name]);
  return result.rows[0];
};

export const getAllCategories = async (): Promise<CategoryApiResponse[]> => {
  const result = await pool.query(QUERIES.GET_ALL_CATEGORIES);
  return result.rows;
};

export const updateCategory = async (
  category: Category,
): Promise<CategoryApiResponse> => {
  const { id, name, description } = category;
  const result = await pool.query(QUERIES.UPDATE_CATEGORY, [
    name,
    description,
    id,
  ]);
  return result.rows[0];
};

export const deleteCategory = async (
  id: string,
): Promise<CategoryApiResponse> => {
  const result = await pool.query(QUERIES.DELETE_CATEGORY, [id]);
  return result.rows[0];
};

