import { useDispatch, useSelector } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { vote, voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    let sortedAnecdotes = [...anecdotes]
    sortedAnecdotes.sort((a, b) => a.votes < b.votes)

    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = sortedAnecdotes.filter((a) => {
        if (a.content.includes(filter)) {
            return a
        } else {
            return null
        }
    })

    const likeAnecdote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        const notification = `You liked '${anecdote.content}'!`
        dispatch(setNotification(notification, 5))
    }

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
                            <button onClick={() => likeAnecdote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList
