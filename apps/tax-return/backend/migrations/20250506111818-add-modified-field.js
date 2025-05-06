'use strict';  
  
module.exports = {  
  up: async (queryInterface) => {  
    // Use raw SQL to add the 'modified' column  
    await queryInterface.sequelize.query(`  
      ALTER TABLE morgage_interest  
      ADD COLUMN modified TIMESTAMP  
    `); 
    
    await queryInterface.sequelize.query(`  
      ALTER TABLE other_reliabilities  
      ADD COLUMN modified TIMESTAMP  
    `);
    
    await queryInterface.sequelize.query(`  
      ALTER TABLE pensions_grants_subsidies  
      ADD COLUMN modified TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE person  
      ADD COLUMN modified TIMESTAMP 
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE per_diem_and_perks  
      ADD COLUMN modified TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE real_estate  
      ADD COLUMN modified TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE salary_work_payments  
      ADD COLUMN modified TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE tax_submission  
      ADD COLUMN modified TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE vehicle  
      ADD COLUMN modified TIMESTAMP
    `);
  },  
  
  down: async (queryInterface) => {  
    // Use raw SQL to remove the 'modified' column on rollback
    await queryInterface.sequelize.query(`  
      ALTER TABLE morgage_interest  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE other_reliabilities  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE pensions_grants_subsidies  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE person  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE per_diem_and_perks  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE real_estate  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE salary_work_payments  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE tax_submission  
      DROP COLUMN modified  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE vehicle  
      DROP COLUMN modified  
    `);  
  },  
};  