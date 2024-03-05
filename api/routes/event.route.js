const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middlewares/checkAuth");

const {
  getAllEventsHandler,
  getEventById,
  getEventByState,
  createEvent,
  registerUserEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

router.get("/", getAllEventsHandler);
router.get("/:eventId/user/:userId", getEventByState);
router.put("/:eventId/user/:userId", registerUserEvent)
router.get("/:id", getEventById);
router.post("/", checkAuth,createEvent);
router.put("/:id",checkAdmin,updateEvent);
router.delete("/:id",checkAdmin,deleteEvent);

module.exports = router;
