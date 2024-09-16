const connectToMongo = require('./db');
const express = require('express')

const startApp = async () => {
    connectToMongo();
}
startApp();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Krishn!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

