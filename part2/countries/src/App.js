import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

import Filter from './components/Filter';
import DisplayCountries from './components/DisplayMaps';

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
      <Filter searchedCountry={searchedCountry} handleCountrySearch={handleCountrySearch} />
      <DisplayCountries visibleCountries={visibleCountries} />
    </div>
  )
}

export default App;
