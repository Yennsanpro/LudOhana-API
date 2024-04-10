const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_KEY)

const ContributionModel = require('../models/contribution.model.js')
const EventModel = require('../models/event.model.js')

const createCheckout = async (req, res) => {
  try {
    /*
        {
            "name": "Evento Telde",
            "description": "Evento de dibujo Telde",
            "amount": 20
        }
        */
    const event = await EventModel.findByPk(req.body.eventId)
    if (!event) {
      return res.status(404).send('Event not found')
    }
    const baseUrl = req.protocol + '://' + req.get('host')
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: req.body.name,
              description: req.body.description,
            },
            currency: 'eur',
            unit_amount: req.body.amount * 100, // 20 eur must be 2000
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // success_url: baseUrl,
      // cancel_url: baseUrl,
      // Dev Mode
      success_url: "http://localhost:5173/events/"+req.body.eventId,
      cancel_url: "http://localhost:5173/events/"+req.body.eventId,
      // Produccion Mode
      // success_url: baseUrl,
      // cancel_url: baseUrl,
      metadata: {
        eventId: req.body.eventId,
        userId: res.locals.user.dataValues.id,
      },
    })
    return res.status(200).json(session)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const webhook = async (req, res) => {
  try {
    let event = req.body
    console.log("webhook event", event)
    //Check if event has "checkout.session.completed" type
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
    console.log("webhook session", session)

      await createContribution(req, res, {
        amount: session.amount_total / 100,
        eventId: session.metadata.eventId,
        userId: session.metadata.userId,
      })
    }

    res.status(200).end()
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
}

const createContribution = async (req, res, { amount, userId, eventId }) => {
  try {
    const contributionsFields = [amount, userId, eventId]
    console.log("contributionsFields", contributionsFields)
    if (contributionsFields.every((field) => field === null)) {
      console.log('Contribution fields incomplete')
      return res.status(406).send('Contribution fields incomplete')
    }

    await ContributionModel.create({
      amount: parseInt(amount),
      userId: parseInt(userId),
      eventId: parseInt(eventId),
    })

    res.status(200).send('Contribution successful')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateContribution = async (req, res) => {
  try {
    const [contributionExist, contribution] = await ContributionModel.update(req.body, {
      returning: true,
      where: {
        id: req.params.contributionId,
      },
    })
    if (contributionExist !== 0) {
      return res.status(200).json({ message: "Contribution updated", contribution: contribution })
    } else {
      return res.status(404).send("Contribution not found")
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteContribution = async(req, res) => {
  try {
    const contribution = await ContributionModel.destroy({
      where: {
        id: req.params.contributionId,
      },
    })

    if (contribution) {
      return res.status(200).json('Contribution deleted')
    } else {
      return res.status(404).send('Contribution not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createCheckout,
  webhook,
  updateContribution,
  deleteContribution,
}
