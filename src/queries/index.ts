const QUERIES = {
  CREATE_USER:
    'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
  FIND_USER_BY_EMAIL: 'SELECT * FROM "user" WHERE email = $1',
  GET_ALL_USER_IDS: 'SELECT id FROM "user"',
  GET_CATEGORY_IDS: 'SELECT id FROM category',
  GET_CATEGORY_BY_ID: 'SELECT * FROM category WHERE id = $1',
  GET_CATEGORY_BY_NAME: 'SELECT * FROM category WHERE name = $1',
  CREATE_CATEGORY:
    'INSERT INTO category (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
};

export default QUERIES;
