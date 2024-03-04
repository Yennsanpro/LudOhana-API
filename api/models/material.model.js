const { DataTypes } = require('sequelize')
const sequelize = require('../../db/index.js')

const MaterialModel = sequelize.define(
	'material',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {createdAt: false, updatedAt: false}
)

module.exports = MaterialModel