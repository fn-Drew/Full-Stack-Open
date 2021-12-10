import React, { useState } from 'react'

// const Button = (onClick, text) => {
//   return <button onClick={onClick}> {text} </button> 
// }
// <Button onClick={() => setGood(good + 1)} text={'test'} />

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + bad + neutral

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)} > good </button>
      <button onClick={() => setNeutral(neutral + 1)} > neutral </button>
      <button onClick={() => setBad(bad + 1)} > bad </button>
      <h3> good = {good} </h3>
      <h3> neutral = {neutral} </h3>
      <h3> bad = {bad} </h3>
      <h3> average = {total / 3} </h3>
      <h3> positive = { (good / total) * 100 }% </h3>
      <h3> total = {total} </h3>
    </div>
  )
}

export default App