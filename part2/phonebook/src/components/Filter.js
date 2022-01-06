const Filter = (props) => {
  return (
    <div>
      <form> 
        search: <input
        value={props.searchedName}
        onChange={props.handleNameSearch}
        />
      </form>
    </div>
  )
}

export default Filter