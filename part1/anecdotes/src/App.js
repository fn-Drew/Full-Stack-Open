import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  var largestVotes = points[0];

  for (var i = 0; i < points.length; i++) {
      if (largestVotes < points[i] ) {
          largestVotes = points[i];
      }
  }

  const vote = () => {
    let newPoints= [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }
   
  const randomNumber = () => {
   return setSelected(Math.floor(Math.random() * anecdotes.length)) 
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>votes = {points[selected]}</p>
      <Button onClick={() => randomNumber()} text={'new quote'}/>
      <Button onClick={() => vote()} text={'vote'}/>
      <h1>Top Anecdote</h1>
      <p>{anecdotes[points.indexOf(largestVotes)]}</p>
    </div>
  )
}

export default App