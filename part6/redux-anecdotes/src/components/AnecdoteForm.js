import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
