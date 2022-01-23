import { useReducer, useEffect } from "react"
import axios from 'axios'

const DisplayCountries = (props) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const api_key = process.env.REACT_APP_API_KEY

          // <div style={{backgroundImage: `url(${country.flag})`}} >
// bg-[url('./Images/test.png')]'
  return(
    props.visibleCountries.map(country => {
      if (country.isShown === true) {
        return(
          <div class="text-slate-100 rounded-3xl bg-slate-700 p-10 m-auto w-screen">
            <h2 class="underline text-3xl inline-block px-4 pb-4"> {country.name} </h2>
            <button class="text-3xl" onClick={() => {
              country.isShown = false
              forceUpdate()
            }}>^</button>
            <div>
              <p> Capital: {country.capital} </p>
              <p> Population: {country.population} </p>
            </div>
            <h3> Spoken Languages </h3>
            <ul class="list-disc">
              {country.languages.map(language =>(
                <li> {language.name} </li>
              ) )}
            </ul>
            <h3> Weather </h3>
            <div> {console.log(`Rendering ${country.name} weather NOW`)} </div>
            <p> Temperature = {country.temp} </p>
          </div>
        )
      } else if (country.isShown === false) {
        return(
          <div class="rounded-3xl text-slate-100 text-3xl p-10 bg-slate-700 w-screen mx-12 space-x-6">
            <h2 class="underline text-3xl inline-block" > {country.name} </h2>
            <button onClick={() => {
              country.isShown = true
              let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
              axios.get(url).then(response => {
                country.temp = Math.round((response.data.main.temp - 273.15) * 9/5 + 32)
                console.log(`Set ${country.name}, ${country.capital} temperature to ${country.temp}`)
              })
              forceUpdate()
            }}>v</button>
          </div>
        )
      }
    })
  )
}

export default DisplayCountries