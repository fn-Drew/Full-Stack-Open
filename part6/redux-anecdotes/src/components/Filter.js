import { filterUpdate } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    return (
        <input
            type="text"
            name="filter"
            onChange={(event) => dispatch(filterUpdate(event.target.value))}
        />
    )
}

export default Filter
