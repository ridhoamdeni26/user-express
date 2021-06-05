'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('users', [
      {
        name: "Ridho Amdeni",
        profession: "Web Developer",
        role: "admin",
        email: "ridhoa@abpluss.co.id",
        password: await bcrypt.hash('rahasia1234', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Test Data 2",
        profession: "Frontend Developer",
        role: "student",
        email: "data2@abpluss.co.id",
        password: await bcrypt.hash('rahasiaku1234', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
     ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
