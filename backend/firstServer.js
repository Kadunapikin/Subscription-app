require('dotenv').config();
const admin = require('firebase-admin');
const express = require('express');
const serviceAccount = require('./serviceAccountKey.json');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());

const { basic, standard, premium } = ['price_1OZehTF3aDYPvbFaNP2fTYjf', 'price_1OZf5yF3aDYPvbFalgdfossS', 'price_1OZf7pF3aDYPvbFaFynDwITV'];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stripe-subscription-ab0e1-default-rtdb.firebaseio.com"
  });

app.use(cors({
    origin: 'http://localhost:5173'
}));

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

//Create subscription
const stripeSession = async (planId) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: planId, // Use the correct Price ID here
                    quantity: 1
                },
            ],
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel'
        });
        return session;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

app.post('/api/v1/create-subscription-checkout-session', async (req, res) => {
    const {plan, customerId} = req.body;
    let planId = null;
    if(plan === 9) planId = basic;
    else if(plan === 19) planId = standard;
    else if(plan === 39) planId = premium;

    try {
        const session = await stripeSession(planId);
        const user = await admin.auth().getUser(customerId);

        await admin.database().ref('users').child(user.uid).update({
            subscription: {
                session: session.id
            }
        });
        console.log(session);
        return res.json({session});
        
    } catch (error) {
        res.send(error);
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 
