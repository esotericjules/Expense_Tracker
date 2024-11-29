import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// TODO: Add error handling

const runMigrations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  // Get the directory name of the current file
  const __dirname = path.dirname(__filename);

  const migrationsPath = path.join(__dirname, './');
  console.log('__filename', __filename);
  console.log('__dirname', __dirname);
  console.log('migrationsPath', migrationsPath);

  const migrationsFiles = fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith('.sql')); // Filter only `.sql` files
  console.log('migrationsFiles', migrationsFiles);

  for (const file of migrationsFiles) {
    const filePath = path.join(migrationsPath, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
      console.log(`Migration ${file} completed successfully.`);
    } catch (err) {
      console.error(`Error running migration ${file}:`, err);
    }
  }

  pool.end();
};

runMigrations();
