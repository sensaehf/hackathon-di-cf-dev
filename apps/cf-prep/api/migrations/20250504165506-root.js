'use strict'

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

        CREATE TABLE consent (
          id UUID NOT NULL DEFAULT gen_random_uuid(),
          national_id VARCHAR NOT NULL UNIQUE,
          created TIMESTAMP WITH TIME ZONE DEFAULT now(),
          modified TIMESTAMP WITH TIME ZONE DEFAULT now(),
          consented BOOLEAN NOT NULL DEFAULT false,
          PRIMARY KEY (id)
        );

      COMMIT;
    `)
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DROP TABLE consent;
    `)
  },
}