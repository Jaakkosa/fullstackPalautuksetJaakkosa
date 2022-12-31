const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI

 mongoose.connect(mongoUrl)
  .then(result => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/', notesRouter)
app.use('/', usersRouter)
app.use('/', loginRouter)



module.exports = app