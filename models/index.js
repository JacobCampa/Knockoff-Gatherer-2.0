const cards = require('./cardInfo');
const user = require('./UserInfo');

user.hasMany(cards, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

cards.belongsTo(user, {
    foreignKey: 'id',
})