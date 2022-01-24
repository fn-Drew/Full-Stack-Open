import { useReducer, useEffect } from "react"
import axios from 'axios'


const DisplayCountries = (props) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const api_key = process.env.REACT_APP_API_KEY

    if (Object.keys(props.visibleCountries).length <= 10) {
    }

  if (Object.keys(props.visibleCountries).length <= 10) {
    return(
      props.visibleCountries.map(country => {
        if (country.isShown === true) {
          return(
            <div class="text-slate-100 rounded-3xl bg-slate-700 p-10 m-auto space-x-6 underline-offset-8 shadow-2xl  mx-14">
              <h2 class="underline text-3xl inline-block pb-4"> {country.name} </h2>
              <button class="text-3xl" onClick={() => {
                country.isShown = false
                forceUpdate()
              }}>v</button>
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
            <div class="rounded-3xl text-slate-100 text-3xl p-10 bg-slate-700 mx-14 shadow-xl underline-offset-8 space-x-6">
              <h2 class="underline text-3xl inline-block" > {country.name} </h2>
              <button onClick={() => {
                country.isShown = true
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
                axios.get(url).then(response => {
                  country.temp = Math.round((response.data.main.temp - 273.15) * 9/5 + 32)
                  console.log(`Set ${country.name}, ${country.capital} temperature to ${country.temp}`)
                })
                forceUpdate()
              }}>^</button>
            </div>
          )
        }
      })
    )
  } else {
    return(
      <div>
        <p class="text-4xl"> Please refine your search </p>
        <p class="text-4xl py-8"> Total Results : {Object.keys(props.visibleCountries).length} </p>
      </div>
    )
  }
}

export default DisplayCountries