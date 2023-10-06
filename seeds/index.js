const sequelize = require('../config/connection');
const { user, cards } = require('../models')

cardsData = require('./cardSeed.json');
userData = require('./userSeed.json')

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await user.bulkCreate(userData,
        {
            individualHooks: true,
            returing: true,
        });
        process.exit(0)
};

seedAll();
