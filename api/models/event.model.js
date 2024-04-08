const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const EventModel = sequelize.define(
  'event',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
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
    addressURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    addressTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Propoused', 'Pending', 'Aproved', 'Rejected']],
      },
    },
    participants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isContributionRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    contributionRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { createdAt: false, updatedAt: false }
)

module.exports = EventModel
