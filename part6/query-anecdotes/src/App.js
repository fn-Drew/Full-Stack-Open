import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        })
        dispatch({
            type: "SET",
            payload: `You voted for '${anecdote.content}'`,
        })
        setTimeout(() => {
            dispatch({ type: "CLEAR" })
        }, 5000)
    }

    const result = useQuery('anecdotes', getAnecdotes)

    if (result.isLoading) {
        return <div>error</div>
    }

    if (result.isError) {
        return <div>loading...</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
