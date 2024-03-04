
const UserModel = require('../api/models/user.model')


const dbSync =async() => {
    try {
        //await UserModel.sync() 
    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync