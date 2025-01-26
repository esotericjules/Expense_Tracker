import express from 'express';
import {
  createExpenseController,
  getExpenseByIdController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
} from '../controllers/expenseController';

import { ROUTES } from '../constants/routes';
import authMiddleware from '../middlewares/authMiddleware';
import sanitizeMiddleware from '../middlewares/sanitizeMiddleware';

const expenseRoutes = express();

expenseRoutes.post(
  ROUTES.EXPENSE,
  authMiddleware,
  sanitizeMiddleware,
  createExpenseController,
);

expenseRoutes.get(
  ROUTES.EXPENSE_BY_ID,
  sanitizeMiddleware,
  authMiddleware,
  getExpenseByIdController,
);

expenseRoutes.get(ROUTES.EXPENSE, authMiddleware, getAllExpensesController);

expenseRoutes.put(
  ROUTES.EXPENSE_BY_ID,
  authMiddleware,
  sanitizeMiddleware,
  updateExpenseController,
);

expenseRoutes.delete(
  ROUTES.EXPENSE_BY_ID,
  authMiddleware,
  deleteExpenseController,
);

export default expenseRoutes;
