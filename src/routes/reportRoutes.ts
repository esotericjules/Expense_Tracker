import express from 'express';
import {
  getTotalMonthlyExpenseReport,
  getMonthlyCategoryExpenseReport,
  getYearlyExpenseReport,
} from '../controllers/reportController';
import authMiddleware from '../middlewares/authMiddleware';
import { ROUTES } from '../constants/routes';
const router = express.Router();

router.get(
  ROUTES.MONTHLY_REPORT_BY_YEAR,
  authMiddleware,
  getTotalMonthlyExpenseReport,
);

router.get(
  ROUTES.CATEGORY_REPORT,
  authMiddleware,
  getMonthlyCategoryExpenseReport,
);

router.get(ROUTES.YEARLY_REPORT, authMiddleware, getYearlyExpenseReport);

export default router;
