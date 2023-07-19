'use strict';

const { query } = require('express');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Reviews';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(options, [
      {
        polishId: 1,
        userId: 3,
        review: 'Such a beautiful color',
        image: 'https://i.etsystatic.com/20946194/r/il/cdf032/2442688185/il_570xN.2442688185_7uib.jpg',
        stars: 5,
      },
      {
        polishId: 2,
        userId: 2,
        review: 'It was pretty but not exactly like the picture',
        stars: 3,
      },
      {
        polishId: 3,
        userId: 2,
        review: 'Really nice',
        stars: 4,
      },
      {
        polishId: 4,
        userId: 3,
        review: 'It came broken',
        stars: 1,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options);
  }
};
