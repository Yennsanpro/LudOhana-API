const { DataTypes } = require('sequelize')
const sequelize = require('../../db/index.js')

const User_EventModel = sequelize.define(
    'user_event',
    {
        inscribed: {
            type: DataTypes.INTEGER,
          }
    },
    { createdAt: false, updatedAt: false }
)

module.exports = User_EventModel