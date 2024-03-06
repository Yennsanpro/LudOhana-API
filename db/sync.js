const UserModel = require('../api/models/user.model')
const EventModel = require('../api/models/event.model')
const MaterialModel = require('../api/models/material.model.js')
const ContributionModel = require('../api/models/contribution.model')
const User_EventModel = require('../api/models/user_event.model')
const Material_EventModel = require('../api/models/material_event.model.js')


const dbSync =async() => {
    try {
        //await UserModel.sync() 
        // await EventModel.sync()
        // await MaterialModel.sync()
        // await ContributionModel.sync()
        //await User_EventModel.sync()
        await Material_EventModel.sync()


    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync