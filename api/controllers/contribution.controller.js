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
            // success_url: `http://localhost:3000/api/contribution/success?amount=${req.body.amount}`,
            success_url: `http://localhost:3000`,
            cancel_url: 'http://localhost:3000'
        })

        return res.status(200).send(session.url)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const createContribution = async (req, res) => {
    try {
        const test = await stripe.checkout.sessions.list()
        console.log(test.status)
        console.log(test.amount_total)
        console.log(test)
        //await ContributionModel.create({ "amount": parseInt(req.query.amount)})

        res.status(200).send("Contribution successful")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { stripe, createCheckout, createContribution }