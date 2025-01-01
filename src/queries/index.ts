const QUERIES = {
  CREATE_USER:
    'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
  FIND_USER_BY_EMAIL: 'SELECT * FROM "user" WHERE email = $1',
  GET_ALL_USER_IDS: 'SELECT id FROM "user"',
  GET_CATEGORY_IDS: 'SELECT id FROM category',
};

export default QUERIES;
