import { toggleImportanceOf } from "./reducers/noteReducer"
import { useSelector, useDispatch } from "react-redux"
import NewNote from "./components/NewNote"

const App = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)

    const toggleImportance = (id) => {
        // store.dispatch(toggleImportanceOf(id))
        dispatch(toggleImportanceOf(id))
    }

    return (
        <div>
            <NewNote />
            <ul>
                {notes.map(note =>
                    <li key={note.id}
                        onClick={() => toggleImportance(note.id)}
                    >
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default App
