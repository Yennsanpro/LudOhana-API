const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middlewares/checkAuth')

const {
  getAllEventsHandler,
  getEventById,
  getEventByState,
  createEvent,
  registerUserEvent,
  getUserEventsHandler,
  updateEvent,
  deleteEvent,
  addMaterialEvent,
  getMaterialsEvent,
  getEventUserContribution,
  getEventContributions,
  deleteEventUser,
} = require('../controllers/event.controller')

router.get('/', getAllEventsHandler)
router.get('/:eventId/user', checkAuth, getEventByState)
router.get('/user', checkAuth, getUserEventsHandler)
router.get('/:id', getEventById)
router.get('/:eventId/materials', checkAuth, checkAdmin, getMaterialsEvent)
router.get(
  '/:eventId/user/contribution',
  checkAuth,
  getEventUserContribution
)
router.get(
  '/:eventId/contributions',
  checkAuth,
  checkAdmin,
  getEventContributions
)
router.post('/', checkAuth, createEvent)
router.put('/:eventId/user', checkAuth, registerUserEvent)
router.put(
  '/:eventId/materials/:materialId',
  checkAuth,
  checkAdmin,
  addMaterialEvent
)
router.put('/:id', checkAuth, checkAdmin, updateEvent)
router.delete('/:id', checkAuth, checkAdmin, deleteEvent)
router.delete('/:eventId/user', checkAuth, deleteEventUser)

module.exports = router
