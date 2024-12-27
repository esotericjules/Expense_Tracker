import { pool } from '../database/config/db';
import QUERIES from '../queries';
import { User } from '../types/user';

export const findUserByEmail = async (email: string): Promise<User> => {
  const result = await pool.query(QUERIES.FIND_USER_BY_EMAIL, [email]);
  return result.rows[0];
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  const result = await pool.query(QUERIES.CREATE_USER, [
    username,
    email,
    password,
  ]);
  return result.rows[0];
};
