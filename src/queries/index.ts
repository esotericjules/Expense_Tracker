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
  CREATE_EXPENSE:
    'INSERT INTO expense (name, amount, description, category_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  GET_EXPENSE_BY_ID: 'SELECT * FROM expense WHERE id = $1',
  UPDATE_EXPENSE:
    'UPDATE expense SET name = $1, amount = $2, description = $3, category_id = $4 WHERE id = $5 RETURNING *',
  DELETE_EXPENSE: 'DELETE FROM expense WHERE id = $1 RETURNING *',
  GET_ALL_EXPENSES: 'SELECT * FROM expense',
};

export default QUERIES;
