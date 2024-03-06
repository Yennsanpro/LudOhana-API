const router = require('express').Router()
const AuthRouter = require('./auth.route')
const EventRouter = require('./event.route')
const MaterialRouter = require('./material.router.js')
const ContributionRouter = require('./contribution.route.js')
const {checkAdmin} = require('../middlewares/checkAuth.js')


router.use('/auth', AuthRouter)
router.use('/events',EventRouter)
router.use('/materials',checkAdmin, MaterialRouter)
router.use('/contribution', ContributionRouter)


module.exports = router