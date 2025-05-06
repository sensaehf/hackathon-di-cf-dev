'use strict';  
  
module.exports = {  
  up: async (queryInterface) => {  
    // Use raw SQL to add the 'created' column  
    await queryInterface.sequelize.query(`  
      ALTER TABLE mortgage_interest  
      ADD COLUMN created TIMESTAMP  
    `); 
    
    await queryInterface.sequelize.query(`  
      ALTER TABLE other_reliabilities  
      ADD COLUMN created TIMESTAMP  
    `);
    
    await queryInterface.sequelize.query(`  
      ALTER TABLE pensions_grants_subsidies  
      ADD COLUMN created TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE person  
      ADD COLUMN created TIMESTAMP 
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE per_diem_and_perks  
      ADD COLUMN created TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE real_estate  
      ADD COLUMN created TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE salary_work_payments  
      ADD COLUMN created TIMESTAMP
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE vehicle  
      ADD COLUMN created TIMESTAMP
    `);
  },  
  
  down: async (queryInterface) => {  
    // Use raw SQL to remove the 'created' column on rollback
    await queryInterface.sequelize.query(`  
      ALTER TABLE mortgage_interest  
      DROP COLUMN created  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE other_reliabilities  
      DROP COLUMN created  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE pensions_grants_subsidies  
      DROP COLUMN created  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE person  
      DROP COLUMN created  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE per_diem_and_perks  
      DROP COLUMN created  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE real_estate  
      DROP COLUMN created  
    `);  

    await queryInterface.sequelize.query(`  
      ALTER TABLE salary_work_payments  
      DROP COLUMN created  
    `);

    await queryInterface.sequelize.query(`  
      ALTER TABLE vehicle  
      DROP COLUMN created  
    `);  
  },  
};  