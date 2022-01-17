import { useReducer, useEffect } from "react"
import axios from 'axios'

const DisplayCountries = (props) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const api_key = process.env.REACT_APP_API_KEY

  return(
    props.visibleCountries.map(country => {
      if (country.isShown === true) {
        return(
          <div>
            <h2> {country.name} </h2>
             <button onClick={() => {
              country.isShown = false
              forceUpdate()
            }}>hide</button>           
            <p> Capital: {country.capital} </p>
            <p> Population: {country.population} </p>
            <h3> Spoken Languages </h3>
            <ul>
              {country.languages.map(language =>(
                <li> {language.name} </li>
              ) )}
            </ul>
            <img src={country.flag} height='100' ></img>
            <h3> Weather </h3>
            <div> {console.log(`Rendering ${country.name} weather NOW`)} </div>
            <p> Temperature = {country.temp} </p>
          </div>
        )
      } else if (country.isShown === false) {
        return(
          <div>
            <h2> {country.name} </h2>
            <button onClick={() => {
              country.isShown = true
              let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`
              axios.get(url).then(response => {
                country.temp = Math.round((response.data.main.temp - 273.15) * 9/5 + 32)
                console.log(`Set ${country.name}, ${country.capital} temperature to ${country.temp}`)
              })
              forceUpdate()
            }}>show</button>
          </div>
        )
      }
    })
  )

}

export default DisplayCountries