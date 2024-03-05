const router = require('express').Router()

const { createCheckout, webhook } = require('../controllers/contribution.controller.js')

router.post('/checkout', createCheckout)

router.post('/webhook', webhook) // Endpoint para recibir notificaciones Webhook de Stripe+


module.exports = router