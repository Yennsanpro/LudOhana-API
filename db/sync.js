

const EventModel = require('../api/models/event.model')


const dbSync =async() => {
    try {
        //await EventModel.sync({alter:true})
    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync