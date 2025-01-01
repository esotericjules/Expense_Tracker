import { Request, Response } from 'express';
import { handleRequestErrorResponse } from '../helpers/index';
import { insertCategory, getCategoryByName } from '../models/categoryModel';
import { Category } from '../types/category';

export const createCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, description, userId } = req.body;

  if (!name) {
    handleRequestErrorResponse(res, 400, 'The category name is required');
    return;
  }

  if (!userId) {
    handleRequestErrorResponse(res, 400, 'User ID is required');
  }

  // save category to database
  try {
    const existingCategory: Category = await getCategoryByName(name);
    if (existingCategory) {
      handleRequestErrorResponse(res, 409, 'Category already exists');
      return;
    }

    const newCategory = await insertCategory({
      name,
      description,
      userId,
    } as Category);
    res.status(201).json({
      message: 'Category created successfully',
      data: {
        ...newCategory,
      },
    });
    return;
  } catch (error) {
    console.error('Error creating category:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};
