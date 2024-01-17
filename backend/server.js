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




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});