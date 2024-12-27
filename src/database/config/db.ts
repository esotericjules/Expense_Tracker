import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// Create a new Pool instance to connect to the PostgreSQL database
export const pool = new Pool({
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
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
