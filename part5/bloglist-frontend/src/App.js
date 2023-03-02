import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import ConfirmNotification from './components/ConfirmNotification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState({ title: '', url: '' })
    const [sorted, setSorted] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmMessage, setConfirmMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    // on page load check if user has logged in before
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password, })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setConfirmMessage('User logged in!')
            setTimeout(() => {
                setConfirmMessage(null)
            }, 5000)

        } catch (err) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem(
            'loggedBlogAppUser'
        )
        setUser(null)
        setConfirmMessage('You logged out')
        setTimeout(() => {
            setConfirmMessage(null)
        }, 5000)

    }

    const LogoutButton = () => (
        <button onClick={handleLogout}>
            logout
        </button>
    )

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

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

    const blogForm = () => (
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

    const likeBlog = ({ blog }) => {
        const blogObject = {
            title: blog.title,
            author: blog.name,
            url: blog.url,
            user: blog.user,
            likes: ++blog.likes,
            id: blog.id,
        }
        blogService
            .put(blogObject)

        setConfirmMessage('Liked post!')
        setTimeout(() => {
            setConfirmMessage(null)
        }, 5000)
    }

    const LikeButton = ({ blog }) => (
        <button onClick={() => likeBlog({ blog })}>
            like
        </button >
    )

    const deleteBlog = ({ blog }) => {
        if (window.confirm("Do you really want to delete the post?")) {
            const mutableBlogs = blogs

            const pos = mutableBlogs.findIndex(mutableBlog => mutableBlog.id === blog.id)
            mutableBlogs.splice(pos, 1)

            blogService
                .remove(blog)
                .then(() => setBlogs(mutableBlogs))

            setConfirmMessage('Deleted blog!')
            setTimeout(() => {
                setConfirmMessage(null)
            }, 5000)
        }
    }

    const DeleteButton = ({ blog }) => (
        <button onClick={() => deleteBlog({ blog })}>
            delete
        </button >
    )

    const sortBlogs = () => {
        setSorted(!sorted)
        if (sorted) {
            const sortedBlogs = [...blogs]
            sortedBlogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
        } else {
            // eventually chronological sort?
            //  for now alphabetical
            const unsortedBlogs = [...blogs]
            unsortedBlogs.sort((a, b) => {
                const titleA = a.title.toUpperCase()
                const titleB = b.title.toUpperCase()
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });
            setBlogs(unsortedBlogs)
        }
    }


    const SortButton = () => (
        <button onClick={() => sortBlogs()}>
            {sorted ?
                'alphabetical'
                :
                'likes'
            }
        </button >
    )

    return (
        <div>
            <ErrorNotification message={errorMessage} />
            <ConfirmNotification message={confirmMessage} />
            {user ?
                <>
                    <p> {user.name} logged in </p>
                    <LogoutButton />
                    {blogForm()}
                    <h2>blogs</h2>
                    <SortButton />
                    {
                        blogs.map(blog =>
                            blog ?
                                <div key={blog.id}>
                                    <Blog blog={blog} />
                                    <LikeButton blog={blog} />
                                    <DeleteButton blog={blog} />
                                </div>
                                :
                                null
                        )
                    }
                </>
                :
                loginForm()
            }
        </div>
    )
}

export default App
