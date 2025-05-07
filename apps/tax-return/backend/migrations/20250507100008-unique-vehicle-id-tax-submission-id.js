'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('vehicle', ['id', 'tax_submission_id'], {
      unique: true,
      name: 'unique_id_tax_submission_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('vehicle', 'unique_id_tax_submission_id');
  },
};
