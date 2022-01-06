const DisplayPersons = ({ filteredPersons }) => {
  return (
      <ul>
        {filteredPersons.map(person => 
          <li>{person.name} {person.number} </li>
        )}
      </ul>
  )
}

export default DisplayPersons