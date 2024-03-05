const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const EventModel = sequelize.define(
  "event",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1,50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1,50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn:[['Propoused','Pending','Aproved','Rejected']]
      }
      
    },
    participants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    lenght: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = EventModel;
