module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      -- Rename table
      ALTER TABLE morgage_interest RENAME TO mortgage_interest;

      -- Rename primary key columns to "id"
      ALTER TABLE person RENAME COLUMN person_id TO id;
      ALTER TABLE tax_submission RENAME COLUMN tax_submission_id TO id;
      ALTER TABLE real_estate RENAME COLUMN property_id TO id;
      ALTER TABLE vehicle RENAME COLUMN plate_number TO id;
      ALTER TABLE mortgage_interest RENAME COLUMN loan_id TO id;
      ALTER TABLE other_reliabilities RENAME COLUMN simple_loan_id TO id;

      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      -- Revert table rename
      ALTER TABLE mortgage_interest RENAME TO morgage_interest;

      -- Revert primary key column renames
      ALTER TABLE person RENAME COLUMN id TO person_id;
      ALTER TABLE tax_submission RENAME COLUMN id TO tax_submission_id;
      ALTER TABLE real_estate RENAME COLUMN id TO property_id;
      ALTER TABLE vehicle RENAME COLUMN id TO plate_number;
      ALTER TABLE morgage_interest RENAME COLUMN id TO loan_id;
      ALTER TABLE other_reliabilities RENAME COLUMN id TO simple_loan_id;

      COMMIT;
    `);
  },
};
