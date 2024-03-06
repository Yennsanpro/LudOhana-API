const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middlewares/checkAuth");

const {
  getAllEventsHandler,
  getEventById,
  getEventByState,
  createEvent,
  registerUserEvent,
  getUserEventsHandler,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

router.get("/", getAllEventsHandler);
router.get("/:eventId/user",checkAuth, getEventByState)
router.get("/user/:userId", checkAuth, getUserEventsHandler)
router.put("/:eventId/user",checkAuth, registerUserEvent)
router.get("/:id", getEventById);
router.post("/", checkAuth,createEvent);
router.put("/:id",checkAdmin, updateEvent);
router.delete("/:id",checkAdmin, deleteEvent);

module.exports = router;
