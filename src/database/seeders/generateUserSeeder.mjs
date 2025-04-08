import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const generateUserSeeds = async (count) => {
  try {
    const saltRounds = 10;
    const myPlaintextPassword = 'password';
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    let seeds = [];

    for (let i = 0; i < count; i++) {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = hashedPassword;
      seeds.push(`('${username}', '${email}', '${password}')`);
    }
    return seeds.join(',\n');
  } catch (error) {
    console.error('error genenerating user seeder', error);
  }
};

const saveSeedFile = (sqlContent) => {
  // returns the file path of the current file
  const currentFilePath = fileURLToPath(import.meta.url);

  // returns the directory name of the given file path
  const currentDirectory = path.dirname(currentFilePath);

  const seederFileName = '001_seed_users.sql'; // TODO: Move this to a constant file

  // define the file path for the new seeder file
  const filePath = path.join(currentDirectory, seederFileName);

  fs.writeFileSync(filePath, sqlContent);
};

const users = await generateUserSeeds(15);
// Generate the SQL
const seedData = `
INSERT INTO "user" (username, email, password) VALUES
${users};
`;

// Save the SQL to a file
try {
  console.log('Saving seed file...');
  saveSeedFile(seedData);
} catch (err) {
  console.error('Error saving seed file:', err);
}
