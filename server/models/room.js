"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceDaily: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceMonthly: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hasAC: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      photos: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Room",
    },
  );
  return Room;
};
