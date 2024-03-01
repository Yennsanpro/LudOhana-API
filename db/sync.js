//archivo creado para la sincronizAcion

// const UserModel = require('../api/models/user.model')


const dbSync =async() => {
    try {
        //await UserModel.sync({alter:true})
    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync