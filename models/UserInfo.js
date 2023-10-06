const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          min: [8],
          isAlphanumeric: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          min: [8],
          is : /^[0-9a-zA-Z_@./#&+!-]*$/i,
      }
    },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.email = await newUserData.email.toLowerCase();
                return newUserData;
            }
        }        
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
