module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('person', [
      {
        name: 'Jökull Þórðarson',
        national_id: '120389-4569',
        address: 'Bláfjallagata 12, 105 Reykjavík',
        email: 'jokull.thordarson@email.is',
        phone_number: '772-8391',
        created: new Date(),
        modified: new Date(),
      },
    ])
  
  },

  down: async (queryInterface) => {   
    await queryInterface.bulkDelete('person', {
      national_id: '120389-4569',
    })
  },
}
