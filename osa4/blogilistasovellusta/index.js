const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const mongoose = require('mongoose')



const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/', notesRouter)



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})