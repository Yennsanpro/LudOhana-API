const UserModel = require('../api/models/user.model.js')
const EventModel = require('../api/models/event.model.js')
const MaterialModel = require('../api/models/material.model.js')
const ContributionModel = require('../api/models/contribution.model.js')
const User_EventModel = require('../api/models/user_event.model.js')
const Material_EventModel = require('../api/models/material_event.model.js')


function addRelations() {
    try {
        UserModel.belongsToMany(EventModel, { through: User_EventModel })
        EventModel.belongsToMany(UserModel, { through: User_EventModel })

        MaterialModel.belongsToMany(EventModel, { through: Material_EventModel })
        EventModel.belongsToMany(MaterialModel, { through: Material_EventModel })

        UserModel.hasMany(ContributionModel)
        EventModel.hasMany(ContributionModel)

        console.log("Relations added")
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addRelations
}