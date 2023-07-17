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
        description: 'Chasing Rainbows Holographic: Rainbow Pop Nail Polish',
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
      },
      {
        userId: 1,
        description: 'Tan Sparkly Glitter: Tan Nail Polish',
        price: 9.99,
        image: 'https://i.etsystatic.com/7211054/r/il/e5ac57/3793749396/il_1588xN.3793749396_j8yu.jpg'
      },
      {
        userId: 1,
        description: 'Periwinkle Purple Sparkle: Light Purple Nail Polish',
        price: 12.99,
        image: 'https://i.etsystatic.com/7211054/r/il/e70dc1/3862016788/il_1588xN.3862016788_6pow.jpg'
      },
      {
        userId: 1,
        description: 'Super Sun Yellow: Neon Yellow Nail Polish',
        price: 6.99,
        image: 'https://i.etsystatic.com/18735985/r/il/c16832/1867371429/il_1588xN.1867371429_3ibe.jpg'
      },
      {
        userId: 1,
        description: 'Black Blue Holographic WOW: Dark Blue Nail Polish',
        price: 8.99,
        image: 'https://i.etsystatic.com/7211054/r/il/9f11c9/4249093360/il_1588xN.4249093360_edhz.jpg'
      },
      {
        userId: 1,
        description: 'Seductive Ruby Red: Red Nail Polish',
        price: 13.99,
        image: 'https://i.etsystatic.com/7211054/r/il/044579/3841029301/il_1588xN.3841029301_hf1e.jpg'
      },
      {
        userId: 1,
        description: 'Dark Purple Glitter: Purple Nail Polish',
        price: 14.99,
        image: 'https://i.etsystatic.com/7211054/r/il/5fcb6d/2651445979/il_1588xN.2651445979_7940.jpg'
      },
      {
        userId: 1,
        description: 'Hey Hey Pastel Pink: Shimmer Pink Nail Polish',
        price: 10.99,
        image: 'https://i.etsystatic.com/7211054/r/il/aaf7d2/4560625758/il_1588xN.4560625758_7992.jpg'
      },
      {
        userId: 1,
        description: 'Dark Night Grey Red: Grey Red Pink Nail Polish',
        price: 9.99,
        image: 'https://i.etsystatic.com/5651689/r/il/f62c85/1634780682/il_1588xN.1634780682_tkvp.jpg'
      },
      {
        userId: 1,
        description: 'Burgundy Blood: Dark Red Nail Polish',
        price: 11.99,
        image: 'https://i.etsystatic.com/5651689/r/il/5d906e/1682199391/il_1588xN.1682199391_d2bg.jpg'
      },
      {
        userId: 1,
        description: 'Go Touch Grass Green: Green Nail Polish',
        price: 13.99,
        image: 'https://i.etsystatic.com/18778792/r/il/c99bb0/4899269991/il_1588xN.4899269991_pxhx.jpg'
      },
      {
        userId: 1,
        description: 'Orangey Orange: Neon Orange Nail Polish',
        price: 8.99,
        image: 'https://i.etsystatic.com/18778792/r/il/86b0d5/4930456874/il_1588xN.4930456874_k9kv.jpg'
      },
      {
        userId: 1,
        description: 'Rose water Glitter: Pink Shimmer Nail Polish',
        price: 9.99,
        image: 'https://i.etsystatic.com/18778792/r/il/d1ba42/5003440692/il_1588xN.5003440692_k08r.jpg'
      },
      {
        userId: 1,
        description: 'Rich Shine Gold: Gold Nail Polish',
        price: 15.99,
        image: 'https://i.etsystatic.com/15431550/r/il/b51754/3435208624/il_1588xN.3435208624_b6ao.jpg'
      },
      {
        userId: 1,
        description: 'Ocean Baby Blue: Blue Nail Polish',
        price: 7.99,
        image: 'https://i.etsystatic.com/18778792/r/il/e68c92/4858245969/il_1588xN.4858245969_4b81.jpg'
      },
      {
        userId: 1,
        description: 'Metalic Silver Shine: Silver Nail Polish',
        price: 11.99,
        image: 'https://i.etsystatic.com/5651689/r/il/0b87dd/649209520/il_680x540.649209520_jgzl.jpg'
      },
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
