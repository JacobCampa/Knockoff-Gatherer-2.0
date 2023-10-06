const seedCards = require('./cardSeed');
const seedUsers = require('./userSeed');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: false });
  await seedCards();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
