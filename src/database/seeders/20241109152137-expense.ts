'use strict';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { QueryInterface } from 'sequelize';
import User from '../../models/userModel';
import Category from '../../models/categoryModel';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    const users = await User.findAll();
    const categories = await Category.findAll();

    const userIds = users.map((user) => {
      return user.id;
    });
    const categoryIds = categories.map((category) => {
      return category.id;
    });
    const expenses = [];

    // Generate 20 random expense records
    for (let i = 0; i < 20; i++) {
      expenses.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        description: faker.finance.transactionDescription(),
        date: faker.date.recent({ days: 30 }),
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: faker.helpers.arrayElement(categoryIds),
        userId: faker.helpers.arrayElement(userIds),
      });
    }
    await queryInterface.bulkInsert('expense', expenses);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('expense', null, {});
  },
};
