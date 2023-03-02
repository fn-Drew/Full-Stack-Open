import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import ConfirmNotification from './components/ConfirmNotification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState({ title: '', url: '' })
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

    const likePost = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: user.name,
            url: newBlog.url,
        }
        blogService
            .put(blogObject)

        setConfirmMessage('Posted blog!')
        setTimeout(() => {
            setConfirmMessage(null)
        }, 5000)

    }

    const LikeButton = () => (
        <button onClick={() => likePost()}>
            like
        </button>
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
                    {blogs.map(blog =>
                        blog ?
                            <>
                                <Blog key={blog.id} blog={blog} />
                                <LikeButton />
                            </>
                            :
                            null
                    )}
                </>
                :
                loginForm()
            }
        </div>
    )
}

export default App
