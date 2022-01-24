const Filter = (props) => {
    return (
      <div>
        <form class="text-slate-900">
          find countries: <input class="border-blue border-2 p-2 rounded-md shadow-lg focus:outline-none focus:border-grey"
          value={props.searchedCountry}
          onChange={props.handleCountrySearch}
        />
        </form>
      </div>
    )
  }

export default Filter
