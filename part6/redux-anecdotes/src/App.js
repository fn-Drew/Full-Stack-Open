import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a, b) => a.votes < b.votes)

    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
    }

    return (
        <div>
            <AnecdoteList anecdotes={anecdotes} />
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default App
