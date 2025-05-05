module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      CREATE TABLE person (
        person_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        national_id VARCHAR(50)
      );

      CREATE TABLE tax_submission (
        tax_submission_id SERIAL PRIMARY KEY,
        person_id INTEGER REFERENCES person(person_id),
        tax_year INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Income category tables
      CREATE TABLE salary_work_payments (
        id SERIAL PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        employer_name VARCHAR(255),
        amount NUMERIC(15, 2),
        currency CHAR(3),
        description VARCHAR(255),
        year INTEGER
      );

      CREATE TABLE per_diem_and_perks (
        id SERIAL PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        type VARCHAR(100), -- e.g., "Per Diems", "Vehicle Allowance"
        amount NUMERIC(15, 2),
        currency CHAR(3),
        description VARCHAR(255),
        year INTEGER
      );

      CREATE TABLE pensions_grants_subsidies (
        id SERIAL PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        source_name VARCHAR(255), -- e.g., VR, Norðurljós Software
        grant_type VARCHAR(100),  -- e.g., "Vocational Grant", "Sports Grant"
        amount NUMERIC(15, 2),
        currency CHAR(3),
        description VARCHAR(255),
        year INTEGER
      );

      -- Assets
      CREATE TABLE real_estate (
        property_id VARCHAR(50) PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        address VARCHAR(255),
        assessed_value NUMERIC(15, 2),
        currency CHAR(3),
        year INTEGER
      );

      CREATE TABLE vehicle (
        plate_number VARCHAR(20) PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        purchase_year INTEGER,
        purchase_price NUMERIC(15, 2),
        currency CHAR(3),
        year INTEGER
      );

      -- Debt and interest payments
      CREATE TABLE morgage_interest (
        loan_id VARCHAR(50) PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        lender_name VARCHAR(255),
        type VARCHAR(50),
        description VARCHAR(255),
        start_date DATE,
        term_years INTEGER,
        purchase_year INTEGER,
        total_annual_payments NUMERIC(15, 2),
        principal_repayment NUMERIC(15, 2),
        interest_amount NUMERIC(15, 2),
        outstanding_balance NUMERIC(15, 2),
        year INTEGER,
        currency CHAR(3)
      );

      CREATE TABLE other_reliabilities (
        simple_loan_id SERIAL PRIMARY KEY,
        tax_submission_id INTEGER REFERENCES tax_submission(tax_submission_id),
        description VARCHAR(255),
        interest_amount NUMERIC(15, 2),
        balance NUMERIC(15, 2),
        year INTEGER,
        currency CHAR(3)
      );

      COMMIT;
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      DROP TABLE IF EXISTS other_reliabilities;
      DROP TABLE IF EXISTS morgage_interest;
      DROP TABLE IF EXISTS vehicle;
      DROP TABLE IF EXISTS real_estate;
      DROP TABLE IF EXISTS pensions_grants_subsidies;
      DROP TABLE IF EXISTS per_diem_and_perks;
      DROP TABLE IF EXISTS salary_work_payments;
      DROP TABLE IF EXISTS tax_submission;
      DROP TABLE IF EXISTS person;

      COMMIT;
    `);
  },
};
