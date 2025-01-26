const BASE_CATEGORY_ROUTE = '/categories';
const BASE_EXPENSE_ROUTE = '/expenses';

export const ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  CATEGORY: BASE_CATEGORY_ROUTE,
  CATEGORY_BY_ID: `${BASE_CATEGORY_ROUTE}/:id`,
  EXPENSE: BASE_EXPENSE_ROUTE,
  EXPENSE_BY_ID: `${BASE_EXPENSE_ROUTE}/:id`,
};
