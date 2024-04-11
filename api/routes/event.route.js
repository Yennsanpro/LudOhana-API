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
  getMaterialsEvents,
  getEventUserContribution,
  getEventContributions,
  getEventsContributions,
  createMaterialEvent,
  deleteEventUser,
  deleteMaterialsEvents
} = require('../controllers/event.controller')

router.get('/', getAllEventsHandler)
router.get('/:eventId/user', checkAuth, getEventByState)
router.get('/user', checkAuth, getUserEventsHandler)
router.get('/materials', checkAuth, checkAdmin, getMaterialsEvents)
router.get(
  '/contributions',
  checkAuth,
  checkAdmin,
  getEventsContributions
)
router.get('/:id', getEventById)
//router.get('/:eventId/materials', checkAuth, checkAdmin, getMaterialsEvents)
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
router.post(
  '/materials',
  checkAuth,
  checkAdmin,
  createMaterialEvent
)
router.put('/:id', checkAuth, checkAdmin, updateEvent)
router.delete('/:id', checkAuth, checkAdmin, deleteEvent)
router.delete('/:eventId/user', checkAuth, deleteEventUser)
router.delete('/:eventId/material/:materialId',checkAuth, checkAdmin,  deleteMaterialsEvents)

module.exports = router
