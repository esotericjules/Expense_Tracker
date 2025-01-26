import { Request, Response } from 'express';
import {
  handleRequestErrorResponse,
  validateRequestBody,
  validateRequestParams,
  validateUserAccess,
} from '../helpers/controllerValidations';

import {
  createExpense,
  getExpenseById,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from '../models/expenseModel';

import { Expense, ExpenseApiResponse } from '../types/expense';

export const createExpenseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, amount, description, categoryId, userId } = req.body;

  if (
    !validateRequestBody(
      ['name', 'amount', 'categoryId', 'userId'],
      req.body,
      res,
    )
  ) {
    return;
  }

  // userId is the same as the user ID in the token
  if (userId !== req.body.user.userId) {
    handleRequestErrorResponse(res, 403, 'Forbidden');
    return;
  }

  if (typeof amount !== 'number') {
    handleRequestErrorResponse(res, 400, 'Amount must be a number');
    return;
  }

  if (amount <= 0) {
    handleRequestErrorResponse(res, 400, 'Amount must be greater than 0');
    return;
  }

  // save expense to database
  try {
    const newExpense = await createExpense({
      name,
      amount,
      description,
      categoryId: categoryId,
      userId: userId,
    } as Expense);

    res.status(201).json({
      message: 'Expense created successfully',
      data: {
        ...newExpense,
      },
    });
    return;
  } catch (error) {
    console.error('Error creating expense:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const getExpenseByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    handleRequestErrorResponse(res, 400, 'Expense ID is required');
    return;
  }

  try {
    const expense: ExpenseApiResponse = await getExpenseById(id);

    if (!expense) {
      handleRequestErrorResponse(res, 404, 'Expense not found');
      return;
    }

    validateUserAccess(expense.user_id, req, res);

    res.status(200).json({
      message: 'Expense found',
      data: {
        ...expense,
      },
    });
    return;
  } catch (error) {
    console.error('Error getting expense:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const getAllExpensesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const expenses: ExpenseApiResponse[] = await getAllExpenses();
    const userExpenses = expenses.filter(
      (expense) => expense.user_id === req.body.user.userId,
    );

    res.status(200).json({
      message: 'Expenses retrieved successfully',
      data: userExpenses,
    });
    return;
  } catch (error) {
    console.error('Error getting expenses:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const updateExpenseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { name, amount, description, categoryId, userId } = req.body;

  if (
    !validateRequestBody(
      ['name', 'amount', 'categoryId', 'userId'],
      req.body,
      res,
    )
  ) {
    return;
  }

  if (typeof amount !== 'number') {
    handleRequestErrorResponse(res, 400, 'Amount must be a number');
    return;
  }

  if (amount <= 0) {
    handleRequestErrorResponse(res, 400, 'Amount must be greater than 0');
    return;
  }

  try {
    const expense: ExpenseApiResponse = await getExpenseById(id);

    if (!expense) {
      handleRequestErrorResponse(res, 404, 'Expense not found');
      return;
    }

    if (expense.user_id !== userId) {
      handleRequestErrorResponse(res, 403, 'Forbidden');
      return;
    }

    const updatedExpense = await updateExpense({
      id,
      name,
      amount,
      description,
      categoryId,
    } as Expense);

    res.status(200).json({
      message: 'Expense updated successfully',
      data: {
        ...updatedExpense,
      },
    });
    return;
  } catch (error) {
    console.error('Error updating expense:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};

export const deleteExpenseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    handleRequestErrorResponse(res, 400, 'Expense ID is required');
    return;
  }

  try {
    const expense: ExpenseApiResponse = await getExpenseById(id);

    if (!expense) {
      handleRequestErrorResponse(res, 404, 'Expense not found');
      return;
    }

    if (expense.user_id !== req.body.user.userId) {
      handleRequestErrorResponse(res, 403, 'Forbidden');
      return;
    }

    const deletedExpense = await deleteExpense(id);

    res.status(200).json({
      message: 'Expense deleted successfully',
      data: {
        ...deletedExpense,
      },
    });
    return;
  } catch (error) {
    console.error('Error deleting expense:', error);
    handleRequestErrorResponse(res, 500, 'Internal server error');
    return;
  }
};
