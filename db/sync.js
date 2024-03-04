const ContributionModel = require('../api/models/contribution.model')


const dbSync =async() => {
    try {
        //await ContributionModel.sync()
    }catch(error){
        throw new Error(error)
    }
}

module.exports = dbSync