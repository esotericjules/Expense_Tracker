const BASE_CATEGORY_ROUTE = '/categories';
const BASE_EXPENSE_ROUTE = '/expenses';
const BASE_REPORT_ROUTE = '/reports';

export const ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  CATEGORY: BASE_CATEGORY_ROUTE,
  CATEGORY_BY_ID: `${BASE_CATEGORY_ROUTE}/:id`,
  EXPENSE: BASE_EXPENSE_ROUTE,
  EXPENSE_BY_ID: `${BASE_EXPENSE_ROUTE}/:id`,
  REPORT: BASE_REPORT_ROUTE,
  MONTHLY_REPORT_BY_YEAR: `${BASE_REPORT_ROUTE}/monthly/year=:year`,
};
