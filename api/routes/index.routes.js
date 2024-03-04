const router = require('express').Router()
const EventRouter = require('./event.routes')

router.use('/events',EventRouter)

module.exports = router