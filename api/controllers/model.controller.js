const router = require("express").Router;
const EventModel = require("../models/event.model");

const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.findAll();
    if (events.length === 0) {
      return res.status(404).send("No events found");
    }

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error getting events:", error);
    return res.status(500).send("Error getting events");
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

/*const getAvailableEvents = async (req, res) => {
    try {
        const events = await EventModel.findAll();
        let now = new Date()
        
        const futureEvents = events.filter(event=> event.dateEnd>now )
        if (futureEvents.length === 0) {
            return res.status(404).send('No upcoming events found');
        }
        return res.status(200).json(futureEvents);
    } catch (error) {
        console.error('Error getting events:', error);
        return res.status(500).send('Error getting events');
    }
};*/

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
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
