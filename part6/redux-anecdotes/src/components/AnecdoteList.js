import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    anecdotes.sort((a, b) => a.votes < b.votes)

    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter((a) => {
        if (a.content.includes(filter)) {
            return a
        } else {
            return null
        }

    })

    return (
        <>
            <h2>Anecdotes</h2>
            {
                filteredAnecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList
