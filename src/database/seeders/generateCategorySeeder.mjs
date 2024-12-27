import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import pg from 'pg';
import * as dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// TODO: Handle cases when user does not exist in the database

const generateCategorySeeds = async (count) => {
  let seeds = [];
  const categoryNames = [
    'Food',
    'Transportation',
    'Entertainment',
    'Health',
    'Education',
    'Shopping',
    'Bills',
    'Travel',
    'Gifts',
    'Miscellaneous',
  ];
  pool.connect();
  const userIdsQueryResult = await pool.query('SELECT id FROM "user"');
  const userIds = userIdsQueryResult.rows.map((row) => row.id);

  console.log('userCount', userIds);

  for (let i = 0; i < count; i++) {
    const name = categoryNames[i];
    const description = faker.commerce.productDescription();
    const userId = faker.helpers.arrayElement(userIds);
    console.log('userId', userId);
    seeds.push(`('${name}', '${description}', '${userId}')`);
  }

  pool.end();

  return seeds.join(',\n');
};

const saveSeedFile = (sqlContent) => {
  // returns the file path of the current file
  const currentFilePath = fileURLToPath(import.meta.url);

  // returns the directory name of the given file path
  const currentDirectory = path.dirname(currentFilePath);

  const seederFileName = '002_seed_category.sql'; // TODO: Move this to a constant file

  // define the file path for the new seeder file
  const filePath = path.join(currentDirectory, seederFileName);

  fs.writeFileSync(filePath, sqlContent);
};

const categories = await generateCategorySeeds(2);
// Generate the SQL
const seedData = `
INSERT INTO category (name, description, user_id) VALUES
${categories};
`;

// Save the SQL to a file
try {
  console.log('Saving seed file...');
  saveSeedFile(seedData);
} catch (err) {
  console.error('Error saving seed file:', err);
}
