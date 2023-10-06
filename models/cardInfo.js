const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CardInfo extends Model {}

// TODO: Add validations to the CardInfo model

CardInfo.init(
  {
    card_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    card_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'cardinfo',
  }
);

module.exports = CardInfo;
