const sequelize = require('../../db/index.js')

const User_EventModel = sequelize.define(
    'user_event',
    {
        

    },
    { createdAt: false, updatedAt: false }
)

module.exports = User_EventModel