const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')


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



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})