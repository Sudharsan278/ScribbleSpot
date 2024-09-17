const connectToMongo = require('./db');
const express = require('express')

const startApp = async () => {
    connectToMongo();
}
startApp();

const app = express()
const port = 3000

app.use(express.json());   //To Use the request.body we have to use a middleware (app.use(express.json()))

app.get('/', (req, res) => {res.send('Hello Krishn!')})

app.use('/api/auth', require('./routes/authentication'));
app.use('/api/onam', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

