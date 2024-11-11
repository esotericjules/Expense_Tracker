'use strict';
// const { v4: uuidv4 } = require('uuid'); // For generating UUIDs
// const { faker } = require('@faker-js/faker');
// const bcrypt = require('bcryptjs');
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import bcrypt from 'bcryptjs';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
    const saltRounds = 10;
    const myPlaintextPassword = 'password';
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    const user = Array.from({ length: 20 }, () => ({
      id: uuidv4(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('user', user);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {});
  },
};
