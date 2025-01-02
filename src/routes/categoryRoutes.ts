import express from 'express';
import {
  createCategoryController,
  getCategoryByIdController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/categoryController';
import { ROUTES } from '../constants/routes';
import authMiddleware from '../middlewares/authMiddleware';

const categoryRoutes = express();

categoryRoutes.post(ROUTES.CATEGORY, authMiddleware, createCategoryController);

categoryRoutes.get(
  ROUTES.CATEGORY_BY_ID,
  authMiddleware,
  getCategoryByIdController,
);

categoryRoutes.get(ROUTES.CATEGORY, authMiddleware, getAllCategoriesController);

categoryRoutes.put(
  ROUTES.CATEGORY_BY_ID,
  authMiddleware,
  updateCategoryController,
);

categoryRoutes.delete(
  ROUTES.CATEGORY_BY_ID,
  authMiddleware,
  deleteCategoryController,
);

export default categoryRoutes;
