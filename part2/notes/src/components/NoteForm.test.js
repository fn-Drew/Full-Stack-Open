import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    const input = screen.getByRole('textbox')
    // if there are multiple 'textbox' components
    // const inputs = screen.getAllByRole('textbox')

    const sendButton = screen.getByText('save')
    // to find not exact text
    // const element = screen.getByText(
    //     'Does not work anymore :(', { exact: false }
    // )
    // or
    // const element = await screen.findByText('Does not work anymore :(')

    await user.type(input, 'testing a form...')
    // if there are multiple 'textbox' components
    // await user.type(inputs[0], 'testing a form...')

    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

