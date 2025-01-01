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
  const migrationsArgs = process.argv.slice(2);

  // Determine which files to run
  const allMigrationsFiles = fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith('.sql'));

  const filesToRun = migrationsArgs.length
    ? migrationsArgs.filter((arg) => allMigrationsFiles.includes(arg))
    : allMigrationsFiles;

  if (filesToRun.length === 0) {
    console.error(
      migrationsArgs.length
        ? 'No matching migrations files found for the provided arguments.'
        : 'No migrations files found to execute.',
    );
    pool.end();
    return;
  }

  for (const file of filesToRun) {
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
