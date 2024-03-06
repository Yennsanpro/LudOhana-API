const { DataTypes } = require('sequelize')
const sequelize = require('../../db/index.js')

const Material_EventModel = sequelize.define(
    'material_event',
    {
        amountUsed: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        }

    },
    { createdAt: false, updatedAt: false }
)

module.exports = Material_EventModel