const router = require("express").Router()

const { checkAuth, checkAdmin } = require("../middlewares/checkAuth.js")

const {
  createCheckout,
  webhook,
  updateContribution,
  deleteContribution,
} = require("../controllers/contribution.controller.js")

router.post("/checkout", checkAuth, createCheckout)

// Endpoint to recieve Webhook notifications from Stripe
// We don't need to add "CheckAuth" middleware because it check Stripe session object
router.post("/webhook", webhook) 

router.put("/:contributionId", checkAuth, checkAdmin, updateContribution)
router.delete("/:contributionId", checkAuth, checkAdmin, deleteContribution)

module.exports = router
