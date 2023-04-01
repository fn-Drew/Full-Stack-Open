import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
    const queryClient = useQueryClient()

    const newNoteMutation = useMutation(createNote, {
        onSuccess: (newNote) => {
            const notes = queryClient.getQueryData('notes')
            queryClient.setQueryData('notes', notes.concat(newNote))
            // or this method makes a new get request to the server
            // queryClient.invalidateQueries('notes')
        },
    })

    const updateNoteMutation = useMutation(updateNote, {
        onSuccess: (updatedNote) => {
            const notes = queryClient.getQueryData('notes')
            const noteToUpdate = notes.find(note => note.id === updatedNote.id)
            const updatedNotes = notes.map(note => note.id === noteToUpdate.id ? {
                ...noteToUpdate,
                important: !noteToUpdate.important
            } : note)
            queryClient.setQueryData('notes', updatedNotes)
            // or the method that makes an extra get request
            // queryClient.invalidateQueries('notes')
        },
    })

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        newNoteMutation.mutate({ content, important: true })
    }

    const toggleImportance = (note) => {
        updateNoteMutation.mutate({ ...note, important: !note.important })
    }

    const result = useQuery('notes', getNotes, {
        // disable get request on focus of input field
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <div>loading...</div>
    }

    const notes = result.data

    return (
        <div>
            <h2>Notes app</h2>
            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
            {notes.map(note =>
                <li key={note.id} onClick={() => toggleImportance(note)}>
                    {note.content}
                    <strong> {note.important ? 'important' : ''}</strong>
                </li>
            )}
        </div>
    )
}

export default App
