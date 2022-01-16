import { useState } from 'react'

const DisplayCountries = (props) => {
  const [showCountry, setShowCountry] = useState(false)

  const show = () => {
    return(

    )
  }

    if (showCountry === false) {
      return(
        props.visibleCountries.map(country =>
        <div>
          <h2> {country.name} </h2>
          <button onClick={() => setShowCountry(true)}>show</button>
        </div>
        )
      )
    } else if (showCountry === true) {
        return(
        props.visibleCountries.map(country => 
          <div>
            <h2> {country.name} </h2>
            <button onClick={() => setShowCountry(false)}>hide</button>
            <p> capital {country.capital} </p>
            <p> population {country.population} </p>
            <h3> Languages </h3>
            <div>
              <ul>
                {country.languages.map(language => 
                  <li> {language.name} </li>
                  )}
              </ul>
            </div>
            <div><img src={country.flag} height={50} /></div>
          </div>
        )
      )
    }
 
}

export default DisplayCountries
