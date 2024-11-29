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
  console.log('Running seeders...');
  const __filename = fileURLToPath(import.meta.url);
  // Get the directory name of the current file
  const __dirname = path.dirname(__filename);

  const seedersPath = path.join(__dirname, './');
  console.log('__filename', __filename);
  console.log('__dirname', __dirname);
  console.log('seedersPath', seedersPath);

  const seederFiles = fs
    .readdirSync(seedersPath)
    .filter((file) => file.endsWith('.sql'));
  console.log('seederFiles', seederFiles);

  for (const file of seederFiles) {
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
