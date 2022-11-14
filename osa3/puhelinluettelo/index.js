
// site:  https://rough-rain-9427.fly.dev/
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')
const { request, response } = require('express')
const Note = require('./numero')


console.log('5')
app.use(express.static('build'))
app.use(cors())
morgan.token('body', req => {
  return JSON.stringify(req.body)
})


app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

console.log(2)

console.log('6')

/* app.get('/', (req, res) => {
    morgan.token('body', req => "")
    res.send('<h1>Hello World!</h1>')
  }) */

app.get('/api/persons', (request, response, next) => {
  Note.find({}).then(notes => {
    response.json(notes)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Note.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Note.find({}).then(notes => {
    response.json('Puhelinluettelossa on ' + String(notes.length) + ':n henkilön numerot' + '' + String(Date()) + '')
  }).catch(error => next(error))
})

console.log('8')
console.log(3)
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = {
    name: name,
    number: number
  }

  Note.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (request.body === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  else {  const henkilo = new Note({
    name: name,
    number: number
  })

  henkilo.save().then(savedNote => {
    return response.json(savedNote)
  }).catch(error => next(error))
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
