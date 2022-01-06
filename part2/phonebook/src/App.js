import React, { useState } from 'react'
import DisplayPersons from './components/DisplayPersons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '402-571-3191', id: 1 },
    { name: 'Ada Lovelace', number: '202-522-4872', id: 2 },
    { name: 'Dan Abramov', number: '207-439-5777', id: 3 },
    { name: 'Mary Poppendieck', number: '518-246-5950', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons)

    if (JSON.stringify(persons).includes(JSON.stringify(newName))) {
      alert(`${newName} is already in the phonebook.`)
      setNewName('')
    }else if (JSON.stringify(persons).includes(JSON.stringify(newNumber))){
      alert(`${newNumber} is already in the phonebook.`)
      setNewNumber('')
    }else {
      const personObject = {
        name: newName, number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add New Person</h2>
      <PersonForm addPerson={addPerson}
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons}/>
    </div>
  )
}

export default App