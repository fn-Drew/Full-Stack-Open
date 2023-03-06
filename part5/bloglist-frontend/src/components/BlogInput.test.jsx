import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogInput from './BlogInput'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()

    const setBlogs = jest.fn()
    const setConfirmMessage = jest.fn()

    const blogs = [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        },
    ]

    const currentUser = {
        username: 'brap',
        id: 2,
    }

    render(<BlogInput
        user={currentUser}
        setBlogs={setBlogs}
        blogs={blogs}
        setConfirmMessage={setConfirmMessage}
    />)

    const inputs = screen.getAllByRole('textbox')

    const sendButton = screen.getByText('save')

    await user.type(inputs[0], 'this is my name')
    await user.type(inputs[1], 'google.com')
    await user.click(sendButton)

    expect(setBlogs.mock.calls).toHaveLength(1)
    expect(setBlogs.mock.calls[0][0].content).toBe('testing a form...')
})
