


const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
const cors = require('cors')

app.use(cors())

/*
  app.use(morgan(function (tokens, req, res,body) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['body'],
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})) */

let numerot = [
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 1
    },
    {
      "name": "Yrjö",
      "number": "123",
      "id": 2
    },
    {
      "name": "Pekka",
      "number": "47478123847238947",
      "id": 3
    }
  ]

  

  app.get('/', (req, res) => {
    morgan.token('body', req => "")
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    morgan.token('body', req => "")
    res.json(numerot)
  })
  app.get('/info', (req,res) => {
    morgan.token('body', req => "")
    res.send('<h1> Puhelinluettelossa on ' + String(numerot.length) + ':n henkilön numerot </h1>' + 
    '<h2>' + String(Date()) + '</h2>')
  })

  app.get('/api/persons/:id', (request, response) => {
    morgan.token('body', request => "")
    const id = Number(request.params.id)
    const person = numerot.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    numerot = numerot.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const Id = Math.random()*100000000 + 1
  
    const person = request.body
    console.log(request.body)
    person.id = Id

  if(!person.name || !person.number){
    return response.status(400).json({ error: 'nimi tai numero puuttuu' 
  })}
  else if(numerot.some(henkilö => henkilö.name == person.name)){
    return response.status(400).json({ error: 'Nimi on jo luettelossa' 
  })
  }
  else if(person == undefined){
    return(console.log("undefined person"))
  }

  else {
    numerot = numerot.concat(person)
    morgan.token('body', request => JSON.stringify(request.body))
    response.json(person)}
  }
  )
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
  })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
