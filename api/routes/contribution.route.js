const router = require("express").Router();

const { checkAuth, checkAdmin } = require("../middlewares/checkAuth.js");

const {
  createCheckout,
  webhook,
  deleteContribution
} = require("../controllers/contribution.controller.js");

router.post("/checkout", checkAuth, createCheckout);
router.post("/webhook", checkAuth, webhook); // Endpoint to recieve Webhook notifications from Stripe
router.delete("/:id", checkAuth, checkAdmin, deleteContribution);

module.exports = router;
