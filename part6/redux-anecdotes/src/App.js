import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialAnecdotes } from './reducers/anecdoteReducer'


const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialAnecdotes())
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
