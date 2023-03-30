import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

import { filterUpdate } from './reducers/filterReducer'

const App = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <input type="text" name="filter" onChange={(event) => dispatch(filterUpdate(event))} />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
