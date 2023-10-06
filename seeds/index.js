const sequelize = require('../config/connection');
const { UserInfo, CardInfo } = require('../models')

cardsData = require('./cardSeed.json');
userData = require('./userSeed.json')

const seedAll = async () => {
    await sequelize.sync({ force: false });

    const users = await UserInfo.bulkCreate(userData,
        {
            individualHooks: true,
            returing: true,
        });
};

seedAll();
