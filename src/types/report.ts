export type MonthlyExpenses = {
  month: number;
  total_expenses: number;
};

export type YearlyExpenses = {
  year: number;
  total_expenses: number;
};

export type CategoryExpenses = {
  category_name: string;
  total_amount: string;
  month: number;
};
export type FormattedCategoryExpenses = {
  category_name: string;
  total_amount: string;
  percentage: number;
};
