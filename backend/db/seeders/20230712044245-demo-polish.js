'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Polishes';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        description: 'Barbie Girl: Pink Nail Polish Hand Mixed',
        price: 10.99,
        image: 'https://i.etsystatic.com/18778792/r/il/bee0f5/4811384291/il_1588xN.4811384291_5wb2.jpg'
      },
      {
        userId: 1,
        description: 'Chasing Rainbows -100% Holographic/SPECTRAFLAIR Nail Polish Indie Rainbow Pop Nail Polish Lacquer Water Marble Stamping Nail Polish',
        price: 12.99,
        image: 'https://i.etsystatic.com/6840190/r/il/f3b1aa/2370282725/il_1588xN.2370282725_1i8a.jpg'
      },
      {
        userId: 1,
        description: 'Holy Guacamole Green: Green Nail Polish',
        price: 7.99,
        image: 'https://i.etsystatic.com/5651689/r/il/017267/679850618/il_1588xN.679850618_l02d.jpg'
      },
      {
        userId: 1,
        description: 'Spooky Halloween Pumkin Orange : Shimmery Orange Nail Polish',
        price: 14.99,
        image: 'https://i.etsystatic.com/5651689/r/il/e6b530/620484637/il_1588xN.620484637_hd51.jpg'
      },
      {
        userId: 1,
        description: 'OH WOW Green Reflective Glitter: Neon Green Nail Polish',
        price: 8.99,
        image: 'https://www.kbshimmer.com/images/products/secondary/pull_it_together_reflective_nail_polish-11.jpg'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options);
  }
};
