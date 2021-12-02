import React, { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  const Display = ({counter}) => <div>{counter}</div>

  const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

  const incrementOne = () => setCounter(counter + 1)
  const decrementOne = () => setCounter(counter -1)
  const reset = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button  onClick={incrementOne} text={'+1'} />
      <Button  onClick={decrementOne} text={'-1'} />
      <Button  onClick={reset} text={'reset'} />
    </div>
  )
}

export default App