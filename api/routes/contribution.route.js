const router = require('express').Router()

const { createCheckout, createContribution } = require('../controllers/contribution.controller.js')

router.post('/checkout', createCheckout)
// router.post('/success', createContribution)

module.exports = router