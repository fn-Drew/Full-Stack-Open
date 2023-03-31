import { createSlice } from "@reduxjs/toolkit"

const genId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addAnecdote(state, action) {
            const content = action.payload
            state.push({
                content,
                id: genId(),
                votes: 0
            })
        },
        vote(state, action) {
            const id = action.payload.id
            const anecdoteToChange = state.find(a => a.id === id)
            const votedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : votedAnecdote
            )
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    }
})

export const { addAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
