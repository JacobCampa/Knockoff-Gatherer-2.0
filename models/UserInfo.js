//Requirements
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const isPassword = (value) => {
  return /^[a-zA-Z0-9]+$/.test(value) && value.length >= 6;
}

class UserInfo extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//Creates UserIfo Model. Sets each columns paramerters
UserInfo.init(
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
        ispassword: isPassword,
          is : /^[0-9a-zA-Z_@./#&+!-]*$/i,
      }
    },
    },
    {
      hooks: {
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = UserInfo;
