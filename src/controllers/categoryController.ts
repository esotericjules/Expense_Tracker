import { Request, Response } from 'express';
import {
  handleRequestErrorResponse,
  validateRequestBody,
  validateRequestParams,
  validateUserAccess,
} from '../helpers/controllerValidations';
import {
  createCategory,
  getCategoryByName,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from '../models/categoryModel';
import { Category, CategoryApiResponse } from '../types/category';

export const createCategoryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, description, userId } = req.body;

  if (!validateRequestBody(['name', 'userId'], req.body, res)) {
    return;
  }

  // userId is the same as the user ID in the token
  if (userId !== req.body.user.userId) {
    handleRequestErrorResponse(res, 403, 'Forbidden');
    return;
  }

  // save category to database
  try {
    const existingCategory: Category = await getCategoryByName(name);
    if (existingCategory) {
      handleRequestErrorResponse(res, 409, 'Category already exists');
      return;
    }

    const newCategory = await createCategory({
      name,
      description,
      user_id: userId,
    } as CategoryApiResponse);
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

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    handleRequestErrorResponse(res, 400, 'Category ID is required');
    return;
  }

  try {
    const category: CategoryApiResponse = await getCategoryById(id);
    if (!category) {
      handleRequestErrorResponse(res, 404, 'Category not found');
      return;
    }

    if (!validateUserAccess(category.user_id, req, res)) {
      return;
    }

    res.status(200).json({
      message: 'Category retrieved successfully',
      data: {
        ...category,
      },
    });
    return;
  } catch (error) {
    console.error('Error retrieving category:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories: CategoryApiResponse[] = await getAllCategories();
    const userCategories = categories.filter(
      (category) => category.user_id === req.body.user.userId,
    );

    res.status(200).json({
      message: 'Categories retrieved successfully',
      data: userCategories,
    });
    return;
  } catch (error) {
    console.error('Error retrieving categories:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!validateRequestParams(['id'], req.params, res)) {
    return;
  }

  if (!validateRequestBody(['name', 'description'], req.body, res)) {
    return;
  }

  try {
    const category: CategoryApiResponse = await getCategoryById(id);

    if (!category) {
      handleRequestErrorResponse(res, 404, 'Category not found');
      return;
    }

    if (!validateUserAccess(category.user_id, req, res)) {
      return;
    }

    const updatedCategory: Category = await updateCategory({
      name,
      description,
      id,
    } as Category);

    res.status(200).json({
      message: 'Category updated successfully',
      data: {
        ...updatedCategory,
      },
    });
    return;
  } catch (error) {
    console.error('Error updating category:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    handleRequestErrorResponse(res, 400, 'Category ID is required');
    return;
  }

  try {
    const category: CategoryApiResponse = await getCategoryById(id);

    if (!category) {
      handleRequestErrorResponse(res, 404, 'Category not found');
      return;
    }

    if (!validateUserAccess(category.user_id, req, res)) {
      return;
    }

    const deletedCategory: CategoryApiResponse = await deleteCategory(id);

    // delete category from database
    res.status(200).json({
      message: 'Category deleted successfully',
      data: {
        ...deletedCategory,
      },
    });
    return;
  } catch (error) {
    console.error('Error deleting category:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};
