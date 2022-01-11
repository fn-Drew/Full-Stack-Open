import axios from 'axios'
import React, { useState, useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNotes, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  useEffect(hook, [])
  return(
    <div>
      {notes.map(note =>
         <div> {note.content} | {note.date} </div>
      )}
    </div>
  )
}

export default App