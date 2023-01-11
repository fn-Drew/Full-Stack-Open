const mongoose = require('mongoose')


const argPassword = process.argv[2]
const argName = process.argv[3]
const argNumber = process.argv[4]

const url = `mongodb+srv://Bean:${argPassword}@beancluster.iij4t.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: argName,
      number: argNumber,
      date: new Date()
    })
    console.log(`added ${argName} number ${argNumber} to phonebook`)
    return person.save()
  })
Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(` ${person.name} ${person.number}`)
  })
  console.log(` - ${argName} ${argNumber}`)
  mongoose.connection.close()
})
  .catch((err) => console.log(err))