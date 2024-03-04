const router = require("express").Router();
const {
  getAllEventsHandler,
  getEventsByState,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

router.get("/", getAllEventsHandler);
router.get("/:state", getEventsByState);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
