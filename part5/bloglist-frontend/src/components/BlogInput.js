import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addBlog, newBlog, setNewBlog }) => (
    <form onSubmit={addBlog}>
        title
        <input
            value={newBlog.title}
            onChange={(event) => {
                setNewBlog({
                    ...newBlog,
                    title: event.target.value
                })
            }}
        />
        url
        <input
            value={newBlog.url}
            onChange={(event) => {
                setNewBlog({
                    ...newBlog,
                    url: event.target.value
                })
            }}
        />
        <button type="submit">save</button>
    </form>
)


const BlogInput = ({ user, setBlogs, blogs, setConfirmMessage }) => {
    const [newBlog, setNewBlog] = useState({ title: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: user.name,
            url: newBlog.url,
        }
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                console.log(returnedBlog)
                setBlogs(blogs.concat(returnedBlog))
            })
        setConfirmMessage('Posted blog!')
        setTimeout(() => {
            setConfirmMessage(null)
        }, 5000)
    }

    return (
        <BlogForm addBlog={addBlog} newBlog={newBlog} setNewBlog={setNewBlog} />
    )

}
export default BlogInput
