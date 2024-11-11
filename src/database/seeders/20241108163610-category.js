'use strict';
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs
const { faker } = require('@faker-js/faker');
// import { EnforceUniqueError, UniqueEnforcer } from 'enforce-unique';
// const { QueryTypes } = require('sequelize');
// const sequelize = require('../config/sequelize.ts');

// import { v4 as uuidv4 } from 'uuid';
// import faker from '@faker-js/faker';
// import { QueryTypes } from 'sequelize';
// import sequelize from '../config/sequelize.ts';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // const users = await sequelize.query('SELECT id FROM user', {
    //   type: QueryTypes.SELECT,
    // });
    // const userIds = users.map((user) => user.id);

    const userIds = [
      'a73bf976-9ad9-44dd-9cb8-94e64ebedbf1',
      'a1831e67-0317-4005-8458-b8274303dc60',
      '3247b2cf-e495-441a-8262-0790ba431569',
    ];

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
