'use strict';
// const { v4: uuidv4 } = require('uuid'); // For generating UUIDs
// const faker = require('faker'); // For generating realistic data
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const expenses = [];

    // Define a few sample category IDs to assign expenses to.
    const categoryIds = [
      '1d2e4567-e89b-12d3-a456-426614174000', // 'Food' category
      '1d2e4567-e89b-12d3-a456-426614174001', // 'Transportation' category
      '1d2e4567-e89b-12d3-a456-426614174002', // 'Entertainment' category
    ];

    const userIds = [
      'c56a4180-65aa-42ec-a945-5fd21dec0539',
      'c56a4180-65aa-42ec-a945-5fd21dec0540',
      'c56a4180-65aa-42ec-a945-5fd21dec0541',
    ];

    // Generate 20 random expense records
    for (let i = 0; i < 20; i++) {
      expenses.push({
        id: uuidv4(), // Generate unique expense ID,
        name: faker.commerce.productName(), // Random name
        amount: parseFloat(faker.finance.amount(5, 100, 2)), // Random amount between 5 and 100
        description: faker.finance.transactionDescription, // Random description
        date: faker.date.recent(30), // Random date in the last 30 days
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: faker.random.arrayElement(categoryIds), // Randomly assign one of the categories
        userId: faker.random.arrayElement(userIds),
      });
    }
    await queryInterface.bulkInsert('expense', expenses);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('expense', null, {});
  },
};
