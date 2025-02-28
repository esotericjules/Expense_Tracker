import { FormattedCategoryExpenses } from '../types/report';

export const formatExpenseMonthToName = (month: number): string => {
  return new Date(2000, month - 1).toLocaleString('en-US', {
    month: 'short',
  });
};

export const formatExpensePercentage = (
  totalExpenses: number,
  expenseAmount: number,
): number => {
  const percentage = (expenseAmount / totalExpenses) * 100;
  return Number(percentage.toFixed(2));
};

export const sumExpensesAmount = (
  expenses: FormattedCategoryExpenses[],
): number => {
  return expenses.reduce(
    (sum, expense) => sum + Number(expense.total_amount),
    0,
  );
};
