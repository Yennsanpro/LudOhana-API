
const UserModel = require('../api/models/user.model')

const EventModel = require('../api/models/event.model')
const MaterialModel = require('../api/models/material.model.js')


const dbSync =async() => {
    try {
        //await UserModel.sync() 
        //await EventModel.sync()
        //await MaterialModel.sync()
    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync