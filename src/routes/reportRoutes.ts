import express from 'express';
import { getTotalMonthlyExpenseReport } from '../controllers/reportController';
import authMiddleware from '../middlewares/authMiddleware';
import { ROUTES } from '../constants/routes';
const router = express.Router();

router.get(
  ROUTES.MONTHLY_REPORT_BY_YEAR,
  authMiddleware,
  getTotalMonthlyExpenseReport,
);

export default router;
