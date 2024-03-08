require('dotenv').config()
const morgan = require('morgan')

const express = require('express')
const api = express()
const path = require('path')

const sequelize = require('./db')

const dbSync = require('./db/sync')
const { addRelations } = require('./db/relationships')
api.use(morgan('dev'))
api.use(express.json())
api.disable('x-powered-by');

api.use('/api', require('./api/routes/index.route'))

api.use(express.static(path.resolve('api/public')))


const dbCheck = async() => {
    try {
        await sequelize.authenticate()
        addRelations()
        await dbSync()
        console.log('connected to DB')
    }catch (error){
        throw new Error(error)
    }
}

api.listen(process.env.PORT, async (err) => {
    if (err) throw new Error ('Cannot start API')
    await dbCheck()
    console.log('*'.repeat(50))
    console.log(`API Running on port ${process.env.PORT}`)
    console.log('*'.repeat(50))
})