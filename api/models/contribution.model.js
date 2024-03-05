const { DataTypes } = require('sequelize')
const sequelize = require('../../db/index.js')

const ContributionModel = sequelize.define('contribution', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    }

}, { createdAt: false, updatedAt: false })

module.exports = ContributionModel
