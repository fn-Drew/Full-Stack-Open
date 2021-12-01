import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>{props.parts} </p>
  )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
]

  return (
    <div>
      <Header course={course} />
     {/* <p>{course.parts.exercises + course.parts.exercises + course.parts.exercises}</p> */} 
    </div>
  )
}

export default App