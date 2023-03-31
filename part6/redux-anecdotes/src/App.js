import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'

import anecdoteService from './services/anecdotes'

const App = () => {

    const dispatch = useDispatch()

    // does not seem to be necessary as we are 
    // also initializing anecdotes in index.js ?
    useEffect(() => {
        anecdoteService.getAll().then(anecdotes => {
            dispatch(setAnecdotes(anecdotes))
        })
    }, [dispatch])

    return (
        <div>
            <Filter />
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
