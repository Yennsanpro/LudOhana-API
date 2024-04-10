const EventModel = require('../models/event.model')
const sequelize = require('../../db/index.js')
const { Op } = require('sequelize')
const MaterialModel = require('../models/material.model.js')
const Material_EventModel = require('../models/material_event.model.js')
const UserModel = require('../models/user.model.js')
const ContributionModel = require('../models/contribution.model.js')

const EVENTS_STATES = {
  propoused: 'Propoused',
  pending: 'Pending',
  aproved: 'Aproved',
  rejected: 'Rejected',
}

const EVENTS_DATES = {
  previous: 'previous',
  current: 'current',
}

const EVENTS_KEYS = {
  state: 'state',
}

const USER_ROLES = {
  user: 'user',
  admin: 'admin',
}

const getAllEventsHandler = async (req, res) => {
  try {
    if (req.query.filter === EVENTS_DATES.previous) {
      return getPreviousEvents(req, res)
    } else if (Object.keys(req.query)[0] === EVENTS_KEYS.state) {
      return getEventsByState(req, res)
    } else {
      return getCurrentsEvents(req, res)
    }
  } catch (error) {
    return res.status(500).send('Error getting events')
  }
}

const getPreviousEvents = async (req, res) => {
  const actualTime = Date.now()

  try {
    const events = await EventModel.findAll({
      where: {
        [Op.and]: [
          {
            dateEnd: {
              [Op.lt]: actualTime,
            },
          },
          { state: EVENTS_STATES.aproved },
        ],
      },
    })

    if (events.length === 0) {
      return res.status(404).send('No previous events found')
    }
    return res.status(200).json(events)
  } catch (error) {
    res.status(500).send('Error finding previous events')
    throw new Error(error)
  }
}

const getCurrentsEvents = async (req, res) => {
  const actualTime = Date.now()

  try {
    const events = await EventModel.findAll({
      where: {
        [Op.and]: [
          {
            dateStart: {
              [Op.gt]: actualTime,
            },
          },
          { state: EVENTS_STATES.aproved },
        ],
      },
    })
    if (events.length === 0) {
      return res.status(404).send('No currents events found')
    }

    return res.status(200).json(events)
  } catch (error) {
    res.status(500).send('Error finding currents events')
    throw new Error(error)
  }
}

const getEventsByState = async (req, res) => {
  // by admin
  try {
    const events = await EventModel.findAll({
      where: {
        state: req.query.state,
      },
    })

    if (events.length === 0) {
      return res.status(404).send(`No ${req.params.state} events found`)
    }
    return res.status(200).json(events)
  } catch (error) {
    res.status(500).send(`Error finding ${req.params.state} events`)
    throw new Error(error)
  }
}

const getEventByState = async (req, res) => {
  // by user
  try {
    const user = await res.locals.user
    const events = await user.getEvents({
      where: {
        state: req.query.state.toLowerCase(),
      },
      joinTableAttributes: [],
    })
    if (events.length === 0) {
      return res.status(404).send(`No events of user found`)
    }
    return res.status(200).json(events)
  } catch (error) {
    res.status(500).send(`Error finding events of user`)
    throw new Error(error)
  }
}

const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.id)
    if (event) {
      return res.status(200).json(event)
    } else {
      return res.status(404).send('Event not found')
    }
  } catch (error) {
    console.log('error')
    return res.status(500).send(error.message)
  }
}

const createEvent = async (req, res) => {
  try {
    if (res.locals.user.role === USER_ROLES.admin) {
      req.body.state = EVENTS_STATES.aproved
    }
    if (res.locals.user.role === USER_ROLES.user) {
      req.body.state = EVENTS_STATES.propoused
    }

    const event = await EventModel.create(req.body)
    res.status(200).json(event)
  } catch (error) {
    res.status(500).send('Error creating event')
    throw new Error(error)
  }
}

const registerUserEvent = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.eventId)
    const eventUsers = await EventModel.findByPk(req.params.eventId, {
      include: {
        model: UserModel,
      },
    })

    //We get all inscribed in target event
    const allObj = eventUsers.users.map(
      (obj) => obj.dataValues.user_event.dataValues
    )
    const totalCurrInscribed = allObj.reduce((prev, curr) => {
      return prev + curr.inscribed
    }, 0)

    //We make a native SQL query to update inscribed in user_events table
    if (
      totalCurrInscribed + req.body.inscribed <=
      eventUsers.dataValues.participants
    ) {
      const result = await event.addUser(res.locals.user)

      await sequelize.query(
        `UPDATE user_events SET inscribed = ${req.body.inscribed}
        where eventid = ${req.params.eventId} and userid = ${res.locals.user.id}`
      )

      return res.status(200).json(result)
    } else {
      return res.status(406).send("Event can't allow more inscribeds")
    }
  } catch (error) {
    res.status(500).send('Error inscribing on event')
    throw new Error(error)
  }
}


const deleteEventUser = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.eventId)
    const user = await res.locals.user
    const result = await event.removeUser(user)
    if (result) {
      return res.status(200).json('User deleted from Event')
    } else {
      return res.status(404).send('Event not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getUserEventsHandler = async (req, res) => {
  try {
    if (req.query.filter === EVENTS_DATES.previous) {
      return getUserEventsPrevious(req, res)
    } else if (req.query.state === EVENTS_STATES.propoused) {
      console.log(req.query)
      return getEventByState(req, res)
    } else {
      return getUserEventsCurrent(req, res)
    }
  } catch (error) {
    res.status(500).send('Error finding events of user')
    throw new Error(error)
  }
}

const getUserEventsCurrent = async (req, res) => {
  try {
    const events = await res.locals.user.getEvents({
      where: {
        dateStart: {
          [Op.gt]: Date.now(),
        },
      },
      joinTableAttributes: [],
    })

    if (events.length === 0) {
      return res.status(404).json({messageError: 'No currents events found'})
    }

    return res.status(200).json(events)
  } catch (error) {
    res.status(500).json({messageError: 'Error finding events of user'})
    throw new Error(error)
  }
}

const getUserEventsPrevious = async (req, res) => {
  try {
    const events = await res.locals.user.getEvents({
      where: {
        dateEnd: {
          [Op.lt]: Date.now(),
        },
      },
      joinTableAttributes: [],
    })

    if (events.length === 0) {
      return res.status(404).send('No previous events found')
    }

    return res.status(200).json(events)
  } catch (error) {
    res.status(500).send('Error finding events of user')
    throw new Error(error)
  }
}

const updateEvent = async (req, res) => {
  try {
    const [eventExist, event] = await EventModel.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    })
    if (eventExist !== 0) {
      return res.status(200).json({ message: 'Event updated', event: event })
    } else {
      return res.status(404).send('Event not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (event) {
      return res.status(200).json('Event deleted')
    } else {
      return res.status(404).send('Event not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const addMaterialEvent = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.eventId)
    const material = await MaterialModel.findByPk(req.params.materialId) //We get a material by id

    let material_eventExist, result

    if (req.body.amountUsed <= material.amount) {
      material.amount -= req.body.amountUsed
      material.update({ amount: material.amount }) //We update material target that we get before

      result = await event.addMaterial(material) //We asociate a material with an event

      //We update amountUsed asociate a material with an event
      material_eventExist = await Material_EventModel.update(
        { amountUsed: req.body.amountUsed },
        {
          where: {
            [Op.and]: [
              { materialId: req.params.materialId },
              { eventId: req.params.eventId },
            ],
          },
        }
      )
    } else {
      return res.status(406).send('Material amount is not enough in stock')
    }

    if (material_eventExist !== 0) {
      return res.status(200).json({ result, amountUsed: req.body.amountUsed })
    } else {
      return res.status(404).send('Event or material not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getMaterialsEvents = async (req, res) => {
  try {
    const material_event_all = await Material_EventModel.findAll()
    const material_all = await MaterialModel.findAll()
    const event_all = await EventModel.findAll()

    const allMaterialEvent = material_event_all.map((obj) => obj.dataValues)
    const allMaterial = material_all.map((obj) => obj.dataValues)
    const allEvent = event_all.map((obj) => ({
      id: obj.dataValues.id,
      title: obj.dataValues.title,
    }))
    const allMaterialEventData = { allMaterialEvent, allMaterial, allEvent }

    if (allMaterialEventData !== 0) {
      return res
        .status(200)
        .json({ allMaterialEventData: allMaterialEventData })
    } else {
      return res.status(404).send('Materials or events not found')
    }
  } catch (error) {
    return res.status(500).send('Error with materials or events')
  }
}

const updateMaterialsEvents = async (req, res) => {
  try {
    //amountUsed, materialId, eventId
    const [materialEventExist] =
      await Material_EventModel.update(req.body, {
        returning: true,
        where: {
          [Op.and]: [
            { eventId: req.params.eventId },
            { materialId: req.params.materialId },
          ],
        },
      })
    if (materialEventExist !== 0) {
      return res
        .status(200)
        .json({ message: 'Materials and materialEvent updated' })
    } else {
      return res.status(404).send('Materials or materialEvent not found')
    }
  } catch (error) {
    return res.status(500).send('Error with materials or materialEvent')
  }
}


const deleteMaterialsEvents = async (req, res) => {
  try {
    //amountUsed, materialId, eventId

    const materialEventExist = await Material_EventModel.destroy( {
        where: {
          [Op.and]: [
            { eventId: req.params.eventId },
            { materialId: req.params.materialId },
          ],
        },
      })
    if (materialEventExist !== 0) {
      return res
        .status(200)
        .json({ message: 'Delete material ' })
    } else {
      return res.status(404).send('Materials or materialEvent not found')
    }
  } catch (error) {
    return res.status(500).send('Error with materials or materialEvent')
  }
}


const getEventUserContribution = async (req, res) => {
  try {
    const contributions = await ContributionModel.findAll({
      where: {
        [Op.and]: [
          { userId: res.locals.user.id },
          { eventId: req.params.eventId },
        ],
      },
    })

    if (contributions !== 0) {
      return res.status(200).json({
        message: 'Contribution belongs to user in this event',
        contributions: contributions,
      })
    } else {
      return res.status(404).send('Contribution not found in this event')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getEventContributions = async (req, res) => {
  try {
    const contributions = await ContributionModel.findAll({
      where: {
        eventId: req.params.eventId,
      },
    })

    if (contributions !== 0) {
      return res.status(200).json({
        message: 'Contributions in this event',
        contributions: contributions,
      })
    } else {
      return res.status(404).send('Contributions not found in this event')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getEventsContributions = async (req, res) => {
  try {
    const contributions = await ContributionModel.findAll()
    const user_all = await UserModel.findAll()
    const event_all = await EventModel.findAll()

    const allContributions = contributions.map((obj) => obj.dataValues)
    const allUsers = user_all.map((obj) => ({
      id: obj.dataValues.id,
      email: obj.dataValues.email,
    }))
    const allEvents = event_all.map((obj) => ({
      id: obj.dataValues.id,
      title: obj.dataValues.title,
    }))

    const allContributionsData = { allContributions, allUsers, allEvents }

    if (allContributionsData !== 0) {
      return res
        .status(200)
        .json({ allContributionsData: allContributionsData })
    } else {
      return res.status(404).send('Contributions not found')
    }
  } catch (error) {
    return res.status(500).send('Contributions error getting data')
  }
}

module.exports = {
  getAllEventsHandler,
  getEventById,
  getEventByState,
  getUserEventsHandler,
  createEvent,
  registerUserEvent,
  deleteEventUser,
  updateEvent,
  deleteEvent,
  addMaterialEvent,
  getMaterialsEvents,
  getEventUserContribution,
  getEventContributions,
  getEventsContributions,
  updateMaterialsEvents,
  deleteMaterialsEvents
}
