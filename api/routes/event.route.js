const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middlewares/checkAuth");

const {
  getAllEventsHandler,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

router.get("/", getAllEventsHandler);
router.get("/:id", getEventById);
router.post("/", checkAuth,createEvent);
router.put("/:id",checkAdmin,updateEvent);
router.delete("/:id",checkAdmin,deleteEvent);

module.exports = router;
