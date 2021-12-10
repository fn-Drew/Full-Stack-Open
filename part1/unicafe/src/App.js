import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}> {text} </button> 
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + bad + neutral

  return (
    <div>
      <h1>Give Feedback</h1>
        <Button onClick={() => setGood(good + 1)} text={'good'} />
        <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button onClick={() => setBad(bad + 1)} text={'bad'} />
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'total'} value={total} />
        <StatisticLine text={'average'} value={total / 3} />
        <StatisticLine text={'positive'} value={(good / total) * 100 + '%'} />
      </div>
  )
}

export default App