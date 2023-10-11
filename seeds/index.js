const sequelize = require('../config/connection');
const { user, cards } = require('../models')

const cardsData = require('./cardSeed.json');
const userData = require('./userSeed.json')

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await user.bulkCreate(userData,
        {
            individualHooks: true,
            returing: true,
        });
    const card = await cards.bulkCreate(cardsData, 
        {
            individualHooks: true,
            returing: true, 
        })
        process.exit(0)
};

seedAll();