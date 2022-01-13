import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

const Filter = (props) => {
    return (
      <div>
        <form>
          search: <input
          value={props.searchedCountry}
          onChange={props.handleCountrySearch}
        />
        </form>
      </div>
    )
  }


function App() {
  const [countries, setCountries] = useState([])
  const [visibleCountries, setVisibleCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setVisibleCountries(countries) 
        console.log(countries)
      })
  }
  useEffect(hook, [])

    const handleCountrySearch = (event) => {
    event.preventDefault()
    let result = countries.filter(country => country.name.toLowerCase().includes(searchedCountry))
    setSearchedCountry(event.target.value)
    setVisibleCountries(result)
  }

  return (
    <div>
      <div>debug: {searchedCountry}</div>
      <Filter searchedCountry={searchedCountry} handleCountrySearch={handleCountrySearch} />
      {visibleCountries.map(country => 
        <div>
          {country.name}
          <div><img src={country.flag} height={50} /></div>
        </div>)}
    </div>
  )
}

export default App;
