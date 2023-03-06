import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    author: 'bean',
    url: 'www.testing.com',
    title: 'Component testing is done with react-testing-library',
    likes: 3,
}

test('renders content', () => {

    render(<Blog blog={blog} />)

    const element = screen.getByText(
        'Component testing is done with react-testing-library'
    )

    expect(element).toBeDefined()
})

describe('Blog works properly with Togglable', () => {
    let container
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
        // content should no longer be hidden
        expect(div).not.toHaveStyle('display: none')

        // expected information is shown after button is clicked
        expect(div).toHaveTextContent(blog.author)
        expect(div).toHaveTextContent(blog.url)
        expect(div).toHaveTextContent(blog.likes)
    })

})
