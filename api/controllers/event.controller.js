const router = require("express").Router;
const EventModel = require("../models/event.model");
const { Op } = require("sequelize");

const getAllEventsHandler = async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.filter === "previous") {
      console.log("estoy en get previous");
      return getPreviousEvents(req, res);
    } else {
      console.log("estoy en get events");
      return getCurrentsEvents(req, res);
    }
  } catch (error) {
    return res.status(500).send("Error getting events");
  }
};

const getPreviousEvents = async (req, res) => {
  const actualTime = Date.now();

  try {
    console.log(actualTime + " hora actual");

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

const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findByPk(req.params.id);
    if (event) {
      console.log(event.dateEnd);
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
    const event = await EventModel.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).send("Error creating event");
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
  getCurrentsEvents,
  getEventById,
  getPreviousEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
