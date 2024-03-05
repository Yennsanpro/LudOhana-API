const router = require('express').Router()
const EventRouter = require('./event.route')
const MaterialsRouter = require('./material.router.js')


router.use('/materials', MaterialsRouter)
router.use('/events',EventRouter)
router.use('/auth', require('./auth.route'))

module.exports = router