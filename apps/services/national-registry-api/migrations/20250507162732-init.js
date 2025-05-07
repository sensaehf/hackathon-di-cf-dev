module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE person (
  national_id VARCHAR(11) PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number VARCHAR(8) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
  `); 
  },

  down: async (queryInterface) => {   
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS person;
    `);
  },
}
