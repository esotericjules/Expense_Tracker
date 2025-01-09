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
import sanitizeMiddleware from '../middlewares/sanitizeMiddleware';
const categoryRoutes = express();

categoryRoutes.post(
  ROUTES.CATEGORY,
  authMiddleware,
  sanitizeMiddleware,
  createCategoryController,
);

categoryRoutes.get(
  ROUTES.CATEGORY_BY_ID,
  sanitizeMiddleware,
  authMiddleware,
  getCategoryByIdController,
);

categoryRoutes.get(ROUTES.CATEGORY, authMiddleware, getAllCategoriesController);

categoryRoutes.put(
  ROUTES.CATEGORY_BY_ID,
  authMiddleware,
  sanitizeMiddleware,
  updateCategoryController,
);

categoryRoutes.delete(
  ROUTES.CATEGORY_BY_ID,
  authMiddleware,
  deleteCategoryController,
);

export default categoryRoutes;
