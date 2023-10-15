//Requirments
const cards = require('./cardInfo');
const user = require('./UserInfo');

//One user can have many cards
user.hasMany(cards, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});
//Cards belon to one user
cards.belongsTo(user, {
    foreignKey: 'id',
})

module.exports = { user, cards }