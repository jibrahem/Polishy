'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'john@aa.io',
        firstName: 'John',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'sally@aa.io',
        firstName: 'Sally',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'raven@aa.io',
        firstName: 'Raven',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      firstName: { [Op.in]: ['John', 'Sally', 'Raven'] }
    }, {});
  }
};
