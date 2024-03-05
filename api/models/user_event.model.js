const { DataTypes } = require('sequelize')
const sequelize = require('../../db/index.js')

const User_EventModel = sequelize.define(
	'user_event',
	{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
		
	},
	{ createdAt: false, updatedAt: false }
)

module.exports = User_EventModel