import { Request, Response } from 'express';
import {
  getTotalMonthlyExpense,
  getCategoryExpensesByMonthYear,
  getYearlyExpenses,
} from '../models/reportModel';
import { handleRequestErrorResponse } from '../helpers/controllerValidations';
import { CategoryExpenses, FormattedCategoryExpenses } from '../types/report';
import {
  formatExpenseMonthToName,
  formatExpensePercentage,
  sumExpensesAmount,
} from './utils';

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

export const getMonthlyCategoryExpenseReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { year, month } = req.query;
    const userId = req.body.user?.userId;

    if (!year || isNaN(Number(year))) {
      handleRequestErrorResponse(res, 400, 'Valid year is required');
      return;
    }

    if (
      !month ||
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      handleRequestErrorResponse(res, 400, 'Valid month (1-12) is required');
      return;
    }

    if (!userId) {
      handleRequestErrorResponse(res, 401, 'Unauthorized');
      return;
    }

    const expenses: CategoryExpenses[] = await getCategoryExpensesByMonthYear(
      Number(year),
      Number(month),
    );

    const formattedCategoryExpenses: FormattedCategoryExpenses[] = expenses.map(
      (expense) => ({
        category_name: expense.category_name,
        total_amount: Number(expense.total_amount).toFixed(2),
        percentage: 0,
      }),
    );

    // Calculate total expenses for percentage calculation
    const totalExpenses = sumExpensesAmount(formattedCategoryExpenses);

    //Add percentage to each category
    formattedCategoryExpenses.forEach((expense) => {
      expense.percentage = formatExpensePercentage(
        totalExpenses,
        Number(expense.total_amount),
      );
    });

    res.json({
      year: Number(year),
      month: Number(month),
      month_name: formatExpenseMonthToName(Number(month)),
      total_expenses: totalExpenses.toFixed(2),
      categories: formattedCategoryExpenses,
    });
  } catch (error) {
    console.error('Error fetching category expense report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getYearlyExpenseReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.body.user?.userId;

    if (!userId) {
      handleRequestErrorResponse(res, 401, 'Unauthorized');
      return;
    }

    const expenses = await getYearlyExpenses(userId);

    const formattedExpenses = expenses.map((expense) => ({
      year: Number(expense.year),
      total_expenses: Number(expense.total_expenses).toFixed(2),
    }));

    res.json({
      expenses: formattedExpenses,
    });
  } catch (error) {
    console.error('Error fetching yearly expense report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
