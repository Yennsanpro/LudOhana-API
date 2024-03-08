const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_KEY)

const ContributionModel = require('../models/contribution.model.js')

const createCheckout = async (req, res) => {
    try {
        /*
        {
            "name": "Evento Telde",
            "description": "Evento de dibujo Telde",
            "amount": 20
        }
        */
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: req.body.name,
                            description: req.body.description
                        },
                        currency: 'eur',
                        unit_amount: req.body.amount * 100, // 20 eur must be 2000
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `http://localhost:3000`,
            cancel_url: 'http://localhost:3000'
        })

        return res.status(200).json(session)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const webhook = async (req, res) => {
    try {
        let event = req.body;
        //Check if event has "checkout.session.completed" type
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            await createContribution(req, res, (session.amount_total / 100))
        }

        res.status(200).end();
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

}

const createContribution = async (req, res, amount) => {
    try {
        await ContributionModel.create({ "amount": parseInt(amount) })

        res.status(200).send("Contribution successful")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { stripe, createCheckout, webhook, createContribution }