const router = require('express').Router()
const EventRouter = require('./event.route')

router.use('/events',EventRouter)
router.use('/auth', require('./auth.route'))

module.exports = router