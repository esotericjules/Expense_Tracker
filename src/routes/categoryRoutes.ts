import express from 'express';
import { createCategory } from '../controllers/categoryController';
import { ROUTES } from '../constants/routes';
import authMiddleware from '../middlewares/authMiddleware';

const categoryRoutes = express();

categoryRoutes.post(ROUTES.CREATE_CATEGORY, authMiddleware, createCategory);

// categoryRoutes.get(ROUTES.GET_CATEGORY, (req, res) => {
//   getCategories(req, res);
// });

export default categoryRoutes;
