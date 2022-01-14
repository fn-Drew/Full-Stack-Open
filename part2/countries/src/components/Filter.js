const Filter = (props) => {
    return (
      <div>
        <form>
          find countries: <input
          value={props.searchedCountry}
          onChange={props.handleCountrySearch}
        />
        </form>
      </div>
    )
  }

export default Filter
