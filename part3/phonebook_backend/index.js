require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---' * 10)
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400, send({ error: 'malformatted id' }))
  }

  next(error)
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)
// this has to be last loaded middleware
app.use(errorHandler)

const Person = require('./models/person')
const { db } = require('./models/person')

app.get('/', (request, response) => {
  response.send('<h1>Home<h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(phonebook => {
    response.json(phonebook)
  })
})

//displays number of people in the database with the Person schema
app.get('/info', (request, response) => {
  Person.find({}).then(phonebook => {
    response.send(`Phonebook has info for ${phonebook.length} people <br>${new Date()} </br>`)
  })
})

//find single person based on id e.g. localhost:3001/api/persons/63beb2f1a0b0f5ef1f50812e
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// Delete person based on id 
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


// Add new person / update number for existing person
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

  // If name already exists, update wtih the new number
  Person.findOneAndUpdate(filter, update, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})