const EventModel = require("../models/event.model");
const sequelize = require("../../db/index.js");
const { Op } = require("sequelize");

const EVENTS_STATES = {
  propoused: "Propoused",
  pending: "Pending",
  aproved: "Aproved",
  rejected: "Rejected",
};

const EVENTS_DATES = {
  previous: "previous",
  current: "current",
};

const EVENTS_KEYS = {
  state: "state",
};

const USER_ROLES = {
  user: "user",
  admin: "admin",
};

const getAllEventsHandler = async (req, res) => {
  try {
    if (req.query.filter === EVENTS_DATES.previous) {
      return getPreviousEvents(req, res);
    } else if (Object.keys(req.query)[0] === EVENTS_KEYS.state) {
      return getEventsByState(req, res);
    } else {
      return getCurrentsEvents(req, res);
    }
  } catch (error) {
    return res.status(500).send("Error getting events");
  }
};

const getPreviousEvents = async (req, res) => {
  const actualTime = Date.now();

  try {
    const events = await EventModel.findAll({
      where: {
        dateEnd: {
          [Op.lt]: actualTime,
        },
      },
    });

    if (events.length === 0) {
      return res.status(404).send("No previous events found");
    }
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).send("Error finding previous events");
    throw new Error(error);
  }
};

const getCurrentsEvents = async (req, res) => {
  const actualTime = Date.now();

  try {
    const events = await EventModel.findAll({
      where: {
        dateStart: {
          [Op.gt]: actualTime,
        },
      },
    });
    if (events.length === 0) {
      return res.status(404).send("No currents events found");
    }

    return res.status(200).json(events);
  } catch (error) {
    res.status(500).send("Error finding currents events");
    throw new Error(error);
  }
};

const getUserProposedEvents = async (req, res) => {
  try {

  } catch (error) {

  }
};

const getEventsByState = async (req, res) => {
  // by admin
  try {
    const events = await EventModel.findAll({
      where: {
        state: req.query.state,
      },
    });

    if (events.length === 0) {
      return res.status(404).send(`No ${req.params.state} events found`);
    }
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).send(`Error finding ${req.params.state} events`);
    throw new Error(error);
  }
};

const getEventByState = async (req, res) => {
  // by user
  try {
    const user = await res.locals.user;
    const events = await user.getEvents({ joinTableAttributes: [] });
    if (events.length === 0) {
      return res.status(404).send(`No events of user found`);
    }
    return res.status(200).json(events);
  } catch (error) {
    res.status(500).send(`Error finding events of user`);
    throw new Error(error);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.id);
    if (event) {
      return res.status(200).json(event);
    } else {
      return res.status(404).send("Event not found");
    }
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
};

const createEvent = async (req, res) => {
  try {
    if (res.locals.user.role === USER_ROLES.admin) {
      req.body.state = EVENTS_STATES.aproved;
    }
    if (res.locals.user.role === USER_ROLES.user) {
      req.body.state = EVENTS_STATES.propoused;
    }

    const event = await EventModel.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).send("Error creating event");
    throw new Error(error);
  }
};

const registerUserEvent = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.eventId);

    //We make a native SQL query to update inscribed in events table
    const eventExist = await sequelize.query(
      `UPDATE events SET inscribed = inscribed + ${req.body.inscribed} where events.id = ${req.params.eventId}`
    );
    const changedRows = eventExist[eventExist.length - 1].changedRows;
    if (changedRows === 1) {
      const user = await res.locals.user
      const result = await event.addUser(user);

      return res.status(200).json(result);
    } else {
      return res.status(404).send("event not found");
    }
  } catch (error) {
    res.status(500).send("Error creating event");
    throw new Error(error);
  }
};

const getUserEventsHandler = async (req, res) => {
  try {
    if (req.query.filter === EVENTS_DATES.previous) {
      return getUserEventsPrevious(req, res);
    } else if (req.query.state === EVENTS_STATES.propoused) {
    } else {
      return getUserEventsCurrent(req, res);
    }
  } catch (error) {
    res.status(500).send("Error finding events of user");
    throw new Error(error);
  }
};

const getUserEventsCurrent = async (req, res) => {
  try {
    const events = await res.locals.user.getEvents({
      where: {
        dateStart: {
          [Op.gt]: Date.now(),
        },
      },
      joinTableAttributes: [],
    });

    if (events.length === 0) {
      return res.status(404).send("No currents events found");
    }

    return res.status(200).json(events);
  } catch (error) {
    res.status(500).send("Error finding events of user");
    throw new Error(error);
  }
};

const getUserEventsPrevious = async (req, res) => {
  try {
    const events = await res.locals.user.getEvents({
      where: {
        dateEnd: {
          [Op.lt]: Date.now(),
        },
      },
      joinTableAttributes: [],
    });

    if (events.length === 0) {
      return res.status(404).send("No previous events found");
    }

    return res.status(200).json(events);
  } catch (error) {
    res.status(500).send("Error finding events of user");
    throw new Error(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const [eventExist, event] = await EventModel.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    if (eventExist !== 0) {
      return res.status(200).json({ message: "event updated", event: event });
    } else {
      return res.status(404).send("event not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (event) {
      return res.status(200).json("Event deleted");
    } else {
      return res.status(404).send("Event not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllEventsHandler,
  getEventById,
  getEventByState,
  getUserEventsHandler,
  getUserProposedEvents,
  createEvent,
  registerUserEvent,
  updateEvent,
  deleteEvent,
};
