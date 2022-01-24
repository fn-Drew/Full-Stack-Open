import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

import Filter from './components/Filter';
import DisplayCountries from './components/DisplayCountries';

function App() {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [visibleCountries, setVisibleCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
        setVisibleCountries(countries) 
      })
  }
  useEffect(hook, [])

  const handleCountrySearch = (event) => {
    event.preventDefault()
    let result = countries.filter(country => country.name.toLowerCase().includes(searchedCountry))
    setSearchedCountry(event.target.value)
    setVisibleCountries(result.map(v => ({...v, isShown: false})))
  }
// bg-[url('./Images/test.png')]'
  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-300 to-slate-400">
      <div class="text-center text-xl p-10">
        <Filter searchedCountry={searchedCountry} handleCountrySearch={handleCountrySearch} />
      </div>
      <div class="grid grid-cols-1 grid-flow-row gap-14 text-center">
        <DisplayCountries visibleCountries={visibleCountries}/>
      </div>
    </div>
  )
}

export default App;