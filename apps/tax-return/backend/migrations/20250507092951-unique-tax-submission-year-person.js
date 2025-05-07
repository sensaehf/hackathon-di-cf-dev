'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('tax_submission', ['tax_year', 'person_id'], {
      unique: true,
      name: 'unique_tax_year_person_id', // optional but recommended
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('tax_submission', 'unique_tax_year_person_id');
  },
};