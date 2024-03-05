const UserModel = require('../api/models/user.model')
const EventModel = require('../api/models/event.model')
const MaterialModel = require('../api/models/material.model')
const ContributionModel = require('../api/models/contribution.model')
const User_EventModel = require('../api/models/user_event.model')

function addRelations(){
    try {
        UserModel.belongsToMany(EventModel, {through: User_EventModel, foreignKey: 'userId', otherKey: 'eventId', unique: false})
        EventModel.belongsToMany(UserModel, {through: User_EventModel, foreignKey: 'eventId', otherKey: 'userId', unique: false})

        console.log('relations added')
        
    } catch (error) {
        
    }
}

module.exports = {
    addRelations
}

