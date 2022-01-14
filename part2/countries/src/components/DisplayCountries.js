const DisplayCountries = (props) => {
  if (Object.keys(props.visibleCountries).length >= 10) {
    return (
      <div>
        Please refine your search
      </div>
    )
  }else {
    return(
      props.visibleCountries.map(country => 
        <div>
          <h2> {country.name} </h2>
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