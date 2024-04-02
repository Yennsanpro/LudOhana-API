const UserModel = require('../api/models/user.model')
const EventModel = require('../api/models/event.model')
const MaterialModel = require('../api/models/material.model.js')
const ContributionModel = require('../api/models/contribution.model')
const User_EventModel = require('../api/models/user_event.model')
const Material_EventModel = require('../api/models/material_event.model.js')


const dbSync =async() => {
    try {
        await UserModel.sync({alter: true}) 
        await EventModel.sync({alter: true})
        await MaterialModel.sync({alter: true})
        await ContributionModel.sync({alter: true})
        await User_EventModel.sync({alter: true})
        await Material_EventModel.sync({alter: true})

    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync