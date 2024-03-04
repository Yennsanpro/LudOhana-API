const { DataTypes } = require('sequelize')
const sequelize = require('../../db/index.js')

const MaterialModel = sequelize.define(
	'material',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 255]
			}
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				min: 1
			}
		}
	},
	{ createdAt: false, updatedAt: false }
)

module.exports = MaterialModel