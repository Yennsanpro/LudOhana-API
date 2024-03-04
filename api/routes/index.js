const router = require('express').Router()

router.use('/contribution', require('./contribution.route.js'))

module.exports = router