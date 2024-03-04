const{ DataTypes } = require('sequelize')
const sequelize = require('../../db')

const UserModel = sequelize.define('user', { 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    role: {
        type:DataTypes.STRING,
        defaultValue: 'user',
        validate: {
            isIn: [[undefined, 'user', 'admin']] //define the admin roll
            }
        },
    location: {
         type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
       allowNull:false
   },
   image: {
    type: DataTypes.STRING,
   allowNull:false
},
    })
module.exports = UserModel