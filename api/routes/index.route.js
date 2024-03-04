const router = require('express').Router()
const EventRouter = require('./event.route')

router.use('/events',EventRouter)

module.exports = router