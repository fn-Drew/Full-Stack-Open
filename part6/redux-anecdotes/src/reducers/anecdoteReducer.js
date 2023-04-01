import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const votedAnecdote = action.payload
            return state.map(anecdote =>
                anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
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

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const addAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = anecdote => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.voteFor(anecdote)
        dispatch(vote(votedAnecdote))
    }
}

export default anecdoteSlice.reducer
