require('dotenv').config();
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});