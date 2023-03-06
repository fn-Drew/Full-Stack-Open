import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Togglable />', () => {
    let container

    const blog = {
        author: 'bean',
        url: 'www.testing.com',
        title: 'Component testing is done with react-testing-library',
        likes: 3,
    }

    beforeEach(() => {
        container = render(
            <Blog blog={blog} />
        ).container
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('more...')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

})
