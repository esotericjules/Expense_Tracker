import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;
dotenv.config();

// TODO: Add error handling

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const runSeeders = async () => {
  const __filename = fileURLToPath(import.meta.url);
  // Get the directory name of the current file
  const __dirname = path.dirname(__filename);

  const seedersPath = path.join(__dirname, './');

  // Get seeder file arguments from the command line
  const seederArgs = process.argv.slice(2);
  // Determine which files to run
  const allSeederFiles = fs
    .readdirSync(seedersPath)
    .filter((file) => file.endsWith('.sql'));

  const filesToRun = seederArgs.length
    ? seederArgs.filter((arg) => allSeederFiles.includes(arg))
    : allSeederFiles;

  if (filesToRun.length === 0) {
    console.error(
      seederArgs.length
        ? 'No matching seeder files found for the provided arguments.'
        : 'No seeder files found to execute.',
    );
    pool.end();
    return;
  }

  for (const file of filesToRun) {
    const filePath = path.join(seedersPath, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
      console.log(`Running seeder: ${file}`);
      await pool.query(sql);
      console.log(`Seeder ${file} completed successfully.`);
    } catch (err) {
      console.error(`Error running seeder ${file}:`, err);
    }
  }

  pool.end();
};

runSeeders();
