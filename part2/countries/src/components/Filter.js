import { Search32 } from '@carbon/icons-react'

const Filter = (props) => {
    return (
      <div>
        <form class="font-body text-platinum">
          <Search32 class="inline-block m-2" /> <input class=" bg-blue p-2 focus:outline-orange focus:outline-1 rounded-md shadow-lg outline-none"
          value={props.searchedCountry}
          onInput={props.handleCountrySearch}
        />
        </form>
      </div>
    )
  }

export default Filter
