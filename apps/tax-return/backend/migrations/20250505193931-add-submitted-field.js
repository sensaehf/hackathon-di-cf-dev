module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      ALTER TABLE tax_submission
      ADD COLUMN submitted_at TIMESTAMP DEFAULT NULL;

      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      ALTER TABLE tax_submission
      DROP COLUMN submitted_at;

      COMMIT;
    `);
  },
};
