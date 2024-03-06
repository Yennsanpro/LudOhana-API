const router = require('express').Router()
const MaterialsRouter = require('./material.router.js')


router.use('/materials', MaterialsRouter)

module.exports = router