const express = require('express')
const app = express()
const cors = require('cors')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

let phonebook = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Home<h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${phonebook.length} people <br>${new Date()} </br>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) - 1
  const person = phonebook.find(person => person.id === id)

  if (person) {
    response.json(phonebook[id])
  } else {
    response.status(404).send('ERROR 404: Person not found').end()
  }
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // if name or number already are in phonebook throw error
  if (phonebook.find(person => person.name === body.name) || phonebook.find(person => person.number === body.number)) {
    return response.status(400).json({
      error: 'name and number must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    serial: Math.floor(Math.random() * (Math.floor(9 ** 10) - Math.ceil(0)))
  }

  phonebook = phonebook.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})