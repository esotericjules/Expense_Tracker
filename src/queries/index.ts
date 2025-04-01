const QUERIES = {
  CREATE_USER:
    'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
  FIND_USER_BY_EMAIL: 'SELECT * FROM "user" WHERE email = $1',
  GET_ALL_USER_IDS: 'SELECT id FROM "user"',
  GET_CATEGORY_IDS: 'SELECT id FROM category',
  GET_CATEGORY_BY_ID: 'SELECT * FROM category WHERE id = $1',
  GET_CATEGORY_BY_NAME: 'SELECT * FROM category WHERE name = $1',
  GET_ALL_CATEGORIES: 'SELECT * FROM category',
  CREATE_CATEGORY:
    'INSERT INTO category (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
  UPDATE_CATEGORY:
    'UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *',
  DELETE_CATEGORY: 'DELETE FROM category WHERE id = $1 RETURNING *',
  CREATE_EXPENSE: `INSERT INTO expense (name, amount, description, category_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  GET_EXPENSE_BY_ID: 'SELECT * FROM expense WHERE id = $1',
  UPDATE_EXPENSE:
    'UPDATE expense SET name = $1, amount = $2, description = $3, category_id = $4 WHERE id = $5 RETURNING *',
  DELETE_EXPENSE: 'DELETE FROM expense WHERE id = $1 RETURNING *',
  GET_ALL_EXPENSES: 'SELECT * FROM expense',
  FETCH_MONTHLY_EXPENSES_REPORT: `
    SELECT 
      created_month AS month,
      SUM(amount) AS total_expenses
   FROM expense
   WHERE 
    created_year = $1
    AND user_id = $2
  GROUP BY created_month
  ORDER BY created_month;
  `,

  FETCH_YEARLY_EXPENSES_REPORT: `
    SELECT year, total_expenses
      FROM expense_yearly_summary
    WHERE user_id = $1
    ORDER BY year DESC;
  `,

  FETCH_CATEGORY_TOTALS_FOR_MONTH: `
    SELECT 
      CASE 
        WHEN c.name IS NULL THEN 'Uncategorized'
        ELSE c.name 
      END AS category_name,
      EXTRACT(MONTH FROM e.created_at) AS month,
      SUM(e.amount) AS total_amount
    FROM expense e
    LEFT JOIN category c ON e.category_id = c.id
    WHERE 
      EXTRACT(YEAR FROM e.created_at) = $1 
      AND EXTRACT(MONTH FROM e.created_at) = $2
    GROUP BY 
      CASE 
        WHEN c.name IS NULL THEN 'Uncategorized'
        ELSE c.name 
      END,
      EXTRACT(MONTH FROM e.created_at)
    ORDER BY total_amount DESC
  `,
};

export default QUERIES;
