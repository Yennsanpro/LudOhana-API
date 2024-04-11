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
      allowNull: false,
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
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isContributionRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    contributionRequired: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { createdAt: false, updatedAt: false }
)

module.exports = EventModel
