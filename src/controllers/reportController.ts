import { Request, Response } from 'express';
import { getTotalMonthlyExpense } from '../models/reportModel';
import { handleRequestErrorResponse } from '../helpers/controllerValidations';

const formatExpenseMonthToName = (month: number) => {
  return new Date(2000, month - 1).toLocaleString('en-US', {
    month: 'short',
  });
};

export const getTotalMonthlyExpenseReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { year } = req.params;
    const userId = req.body.user?.userId;

    if (!year || isNaN(Number(year))) {
      handleRequestErrorResponse(res, 400, 'Valid year is required');
      return;
    }

    if (!userId) {
      handleRequestErrorResponse(res, 401, 'Unauthorized');
      return;
    }

    const expenses = await getTotalMonthlyExpense(Number(year), userId);

    // Format the response to include all months (1-12)
    const formattedExpenses = expenses.map((expense) => {
      return {
        ...expense,
        total_expenses: Number(expense.total_expenses).toFixed(2),
        month_name: formatExpenseMonthToName(expense.month),
      };
    });

    res.json({
      year: Number(year),
      expenses: formattedExpenses,
    });
  } catch (error) {
    console.error('Error fetching total monthly expense report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
