require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
//  logs information about a request (.get, .post, .delete) every time one is made
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('-----------')
  next()
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)

const Person = require('./models/person')

//  just displays 'Home' when at localhost:3001/
app.get('/', (request, response) => {
  response.send('<h1>Home<h1>')
})
//  displays all people in the Person db
app.get('/api/persons', (request, response) => {
  Person.find({}).then(phonebook => {
    response.json(phonebook)
  })
})
//  displays number of people in the Person
app.get('/info', (request, response) => {
  Person.find({}).then(phonebook => {
    response.send(`Phonebook has info for ${phonebook.length} people <br>${new Date()} </br>`)
  })
})
//  find single person based on id e.g. localhost:3001/api/persons/63beb2f1a0b0f5ef1f50812e
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})
//  Delete person based on id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
//  Add new person / update number for existing person
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // If name or number not provided throw error
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const filter = ({ name: body.name })
  const update = ({ number: body.number })

  //  If name already exists, update wtih the new number
  //  FSO says to use an HTTP PUT request, but this seems simpler?
  Person.findOneAndUpdate(filter, update, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

  const person = new Person({
    name: body.name,
    number: body.number
  })

  //  adds persons to database
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

//  errorHandler is never used unless placed later
//  errorHandler to send custom status codes and error messages
const errorHandler = (error, request, response, next) => {
  //  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
