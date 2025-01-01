import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';
import pg from 'pg';
import * as dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const generateExpenseSeeds = async (count) => {
  let seeds = [];
  pool.connect();

  const userIdsQueryResult = await pool.query('SELECT id FROM "user"');
  const userIds = userIdsQueryResult.rows.map((row) => row.id);
  const categoryIdsQueryResult = await pool.query('SELECT id FROM "category"');
  const categoryIds = categoryIdsQueryResult.rows.map((row) => row.id);

  for (let i = 0; i < count; i++) {
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const amount = faker.finance.amount();
    const userId = faker.helpers.arrayElement(userIds);
    const categoryId = faker.helpers.arrayElement(categoryIds);

    seeds.push(
      `('${name}', '${description}', '${amount}', '${userId}', '${categoryId}')`,
    );
  }

  pool.end();
  return seeds.join(',\n');
};

const saveSeedFile = (sqlContent) => {
  // returns the file path of the current file
  const currentFilePath = fileURLToPath(import.meta.url);

  // returns the directory name of the given file path
  const currentDirectory = path.dirname(currentFilePath);

  const seederFileName = '003_seed_expense.sql'; // TODO: Move this to a constant file

  // define the file path for the new seeder file
  const filePath = path.join(currentDirectory, seederFileName);

  fs.writeFileSync(filePath, sqlContent);
};

const expenses = await generateExpenseSeeds(4);
const seedData = `
INSERT INTO expense (name, description, amount, user_id, category_id) VALUES
${expenses};
`;

try {
  console.log('Saving seed file...');
  saveSeedFile(seedData);
} catch (err) {
  console.error('Error saving seed file:', err);
}
