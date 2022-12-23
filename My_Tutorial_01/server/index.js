require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})

const users = require('./routes/users.js')
app.use('/api', users)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}...`)
})
