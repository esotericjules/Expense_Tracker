'use strict';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import User from './../../models/userModel';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = await User.findAll();

    const userIds = users.map((user) => user.id);

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
    const categories = Array.from({ length: 10 }, (_e, i) => ({
      id: uuidv4(),
      userId: faker.helpers.arrayElement(userIds),
      name: categoryNames[i],
      description: faker.commerce.productDescription(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('category', categories);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  },
};
