import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';
import sequelize from './sequelize';
import User from '../models/userModel';
import Category from '../models/categoryModel';
import Expense from '../models/expenseModel';

dotenv.config();

// Create a new Pool instance to connect to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Type definition for query function
type QueryParams = {
  text: string;
  params?: unknown[];
};

// Query function with proper typing for input and output
export const query = async ({
  text,
  params,
}: QueryParams): Promise<QueryResult> => {
  return pool.query(text, params);
};

// Test connection function
export const testDbConnection = async (): Promise<void> => {
  try {
    await pool.query('SELECT NOW()'); // Simple query to check connection
    console.log('Database connection successful');

    await sequelize
      .authenticate()
      .then(() => {
        console.log('Database connected successfully.');
        User.sync();
        Category.sync();
        Expense.sync();
      })
      .catch((error) => {
        console.error('Unable to connect to the database:', error);
      });

    // await sequelize
    //   .sync({ force: false }) // Set to `true` to force-drop and recreate tables (only for development)
    //   .then(() => {
    //     console.log('Database synchronized');
    //     User.sync();
    //     Category.sync();
    //     Expense.sync();
    //   })
    //   .catch((error) => {
    //     console.error('Error synchronizing database:', error);
    //   });
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

