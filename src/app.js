require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3005

app.get('/', (req, res) => {
  res.send('Hello Ranga!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})