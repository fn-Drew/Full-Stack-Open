const Filter = (props) => {
    return (
      <div>
        <form class="text-platinum">
          find countries: <input class=" bg-blue p-2 focus:outline-orange focus:outline-1 rounded-md shadow-lg outline-none"
          value={props.searchedCountry}
          onInput={props.handleCountrySearch}
        />
        </form>
      </div>
    )
  }

export default Filter
