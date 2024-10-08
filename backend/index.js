require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const startApp = async () => {
  connectToMongo();
}
startApp();

const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());   //To Use the request.body we have to use a middleware (app.use(express.json()))

app.get('/', (req, res) => {res.send('Hello Krishn!')})

app.use('/api/auth', require('./routes/authentication'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

