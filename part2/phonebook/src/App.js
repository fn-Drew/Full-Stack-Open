import React, { useEffect, useState } from 'react'
import DisplayPersons from './components/DisplayPersons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ErrorMessage from './components/ErrorMessage'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [error, setError] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    axios
      .post('http://localhost:3001/api/persons', { name: newName, number: newNumber })
      .catch(error => {
        console.log(error.response.data.error)
        console.log(typeof error.response.data.error)
        setError(error.response.data.error)
      })

    if (JSON.stringify(persons).includes(JSON.stringify(newName))) {
      alert(`${newName} is already in the phonebook.`)
      setNewName('')
    } else if (JSON.stringify(persons).includes(JSON.stringify(newNumber))) {
      alert(`${newNumber} is already in the phonebook.`)
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    let result = persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))
    setSearchedName(event.target.value)
    setFilteredPersons(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage error={error} />
      <Filter searchedName={searchedName} handleNameSearch={handleNameSearch} />
      <h3>Add New Person</h3>
      <PersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <DisplayPersons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App