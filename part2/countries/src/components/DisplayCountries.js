import { useReducer } from "react"

const DisplayCountries = (props) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  return(
    props.visibleCountries.map(country => {
      if (country.isShown === true) {
        return(
          <div>
            <h2> {country.name} </h2>
            <h4> {country.capital} </h4>
          </div>
        )
      } else if (country.isShown === false) {
        return(
          <div>
            <h2> {country.name} </h2>
            <button onClick={ () => {
                country.isShown = true
                forceUpdate()
              } 
            }>show</button>
          </div>
        )
      }
    })
  )

}

export default DisplayCountries