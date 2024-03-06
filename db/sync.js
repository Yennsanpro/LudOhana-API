const MaterialModel = require('../api/models/material.model.js')


const dbSync =async() => {
    try {
        //await MaterialModel.sync()
    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync