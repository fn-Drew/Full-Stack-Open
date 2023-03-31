import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    let sortedNotes = [...anecdotes]
    sortedNotes.sort((a, b) => a.votes < b.votes)

    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = sortedNotes.filter((a) => {
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
                            <button onClick={() => dispatch(vote(anecdote))}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList
