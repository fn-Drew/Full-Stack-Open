import { useReducer, useEffect } from "react"
import axios from 'axios'

import { ArrowRight24, ArrowDown24 } from '@carbon/icons-react'


const DisplayCountries = (props) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const api_key = process.env.REACT_APP_API_KEY

  if (Object.keys(props.visibleCountries).length <= 10) {
  }

  if (Object.keys(props.visibleCountries).length <= 10) {
    return (
      props.visibleCountries.map(country => {
        if (country.isShown === true) {
          return (
            <div class="font-body max-w-lg min-w-[90%] md:min-w-[50%] place-self-center hover:ring-4 bg-turqoise-dark hover:bg-turqoise ring-orange text-black rounded-3xl py-6 space-x-6 underline-offset-8 shadow-2xl">
              <button class="text-3xl" onClick={() => {
                country.isShown = false
                forceUpdate()
              }}> <ArrowDown24 aria-label="Add" /> </button>
              <h2 class="underline text-3xl inline-block pb-4"> {country.name} </h2>
              <div>
                <p> Capital: {country.capital} </p>
                <p> Population: {Number(country.population).toLocaleString()} </p>
              </div>
              <h3> Spoken Languages </h3>
              <ul class="list-disc">
                {country.languages.map(language => (
                  <li> {language.name} </li>
                ))}
              </ul>
              <h3> Weather </h3>
              <div> {console.log(`Rendering ${country.name} weather NOW`)} </div>
              <p> Temperature = {country.temp} </p>
            </div>
          )
        } else if (country.isShown === false) {
          return (
            <div class="font-body max-w-lg min-w-[90%] md:min-w-[50%] place-self-center hover:ring-4 text-black ring-orange bg-turqoise-dark hover:bg-turqoise rounded-3xl text-3xl py-6 px-3 shadow-xl underline-offset-8 space-x-6">
              <button onClick={() => {
                country.isShown = true
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
                axios.get(url).then(response => {
                  country.temp = Math.round((response.data.main.temp - 273.15) * 9 / 5 + 32)
                  console.log(`Set ${country.name}, ${country.capital} temperature to ${country.temp}`)
                })
                forceUpdate()
              }}><ArrowRight24 aria-label="Add" /></button>
              <h2 class="underline text-3xl inline-block" > {country.name} </h2>
            </div>
          )
        }
      })
    )
  } else {
    return (
      <div class="font-body">
        <p class="text-platinum text-4xl"> Please refine your search </p>
        <p class="text-platinum text-4xl py-8"> Total Results : <span class="text-orange" > {Object.keys(props.visibleCountries).length} </span>  </p>
      </div>
    )
  }
}

export default DisplayCountries