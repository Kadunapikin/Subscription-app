require('dotenv').config();
const admin = require('firebase-admin');
const express = require('express');
const serviceAccount = require('./serviceAccountKey.json');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stripe-subscription-ab0e1-default-rtdb.firebaseio.com"
});

app.use(cors({
    origin: 'http://localhost:5173' // Update this with your frontend URL
}));

const basicPriceId = 'price_1OZehTF3aDYPvbFaNP2fTYjf';
const standardPriceId = 'price_1OZf5yF3aDYPvbFalgdfossS';
const premiumPriceId = 'price_1OZf7pF3aDYPvbFaFynDwITV';


const stripeSession = async (plan) => {
    try {
        // Fetch the price data from Stripe using the price ID
        const price = await stripe.prices.retrieve(plan);

        // Create the session with the retrieved price data
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription', // Switch to subscription mode
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price.id, // Use the retrieved price ID
                    quantity: 1
                },
            ],
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel'
        });
        return session;
    } catch (error) {
        console.log(error);
    }
}

app.post('/api/v1/create-subscription-checkout-session', async (req, res) => {
    const { plan, customerId } = req.body;
    let priceId = null;

    if (plan === 'basic') priceId = basicPriceId;
    else if (plan === 'standard') priceId = standardPriceId;
    else if (plan === 'premium') priceId = premiumPriceId;
    else {
        return res.status(400).json({ error: 'Invalid plan' });
    }

    try {
        const session = await stripeSession(priceId); // Update function name here
        const user = await admin.auth().getUser(customerId);

        await admin.database().ref('users').child(user.uid).update({
            subscription: {
                session: session.id
            }
        });

        return res.json({ session });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create session' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


//Old server.js codes

// require('dotenv').config();
// const admin = require('firebase-admin');
// const express = require('express');
// const serviceAccount = require('./serviceAccountKey.json');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const moment = require('moment');
// const port = 5000;

// app.use(express.json());
// app.use(bodyParser.json());

// const { basic, standard, premium } = ['price_1OZehTF3aDYPvbFaNP2fTYjf', 'price_1OZf5yF3aDYPvbFalgdfossS', 'price_1OZf7pF3aDYPvbFaFynDwITV'];

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://stripe-subscription-ab0e1-default-rtdb.firebaseio.com"
//   });

// app.use(cors({
//     origin: 'http://localhost:5173'
// }));

// // const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);



// const stripeSession = async (plan) => {
//     try {
//         // Fetch the price data from Stripe using the price ID
//         const price = await stripe.prices.retrieve(plan);

//         // Create the session with the retrieved price data
//         const session = await stripe.checkout.sessions.create({
//             mode: 'payment',
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price: price.id, // Use the retrieved price ID
//                     quantity: 1
//                 },
//             ],
//             success_url: 'http://localhost:5173/success',
//             cancel_url: 'http://localhost:5173/cancel'
//         });
//         return session;
//     } catch (error) {
//         console.log(error);
//     }
// }

// // //Create subscription

// // const stripeSession = async(plan) => {
// //     try {
// //         const session = await stripe.checkout.sessions.create({
// //             mode: subscription,
// //             payment_method_types: ['card'],
// //             line_items: [
// //                 {
// //                     price: plan,
// //                     quantity: 1
// //                 },
// //             ],
// //             success_url: 'http://localhost:5173/success',
// //             cancel_url: 'http://localhost:5173/cancel'
// //         });
// //         return session;
// //     } catch (e) {
// //         return e;
// //     }
// // }

// app.post('/api/v1/create-subscription-checkout-session', async (req, res) => {
//     const {plan, customerId} = req.body;
//     let planId = null;
//     if(plan == 9) planId = basic;
//     else if(plan == 19) planId = standard;
//     else if(plan == 39) planId = premium;

//     try {
//         const session = await stripeSession(planId);
//         const user = await admin.auth().getUser(customerId);

//         await admin.database().ref('users').child(user.uid).update({
//             subscription: {
//                 session: session.id
//             }
//         });
//         console.log(session);
//         return res.json({session});

//     } catch (error) {
//         res.send(error);
//     }
// });


// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });