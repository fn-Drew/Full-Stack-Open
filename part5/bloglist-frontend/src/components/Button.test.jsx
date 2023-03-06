import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

test('button', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<Button mutatingFunction={createNote} text='button' />)

    const button = screen.getByText('button')

    await user.click(button)
    await user.click(button)


    expect(createNote.mock.calls).toHaveLength(2)
})
