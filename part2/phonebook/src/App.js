import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '402-571-3191', id: 1 },
    { name: 'Ada Lovelace', number: '202-522-4872', id: 2 },
    { name: 'Dan Abramov', number: '202-522-4872', id: 3 },
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

  const handleNumberChage = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add New Person</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChage}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newNumber}</div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li>{person.name} {person.number} </li>
        )}
      </ul>
     ...
    </div>
  )
}

export default App