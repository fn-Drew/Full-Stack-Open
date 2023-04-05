import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    const newNoteMutation = useMutation(createAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
        onError: (err) => {
            dispatch({
                type: "SET",
                payload: err.response.data.error,
            })
            setTimeout(() => {
                dispatch({ type: "CLEAR" })
            }, 5000)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newNoteMutation.mutate({ content, votes: 0 })
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
