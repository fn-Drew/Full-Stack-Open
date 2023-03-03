import { useState, useEffect } from 'react'
import Button from './components/Button'
import BlogInput from './components/BlogInput'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import ErrorNotification from './components/ErrorNotification'
import ConfirmNotification from './components/ConfirmNotification'
import UserLogin from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [sorted, setSorted] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmMessage, setConfirmMessage] = useState(null)

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

    const LoggedInLayout = () => (
        <>
            <p> {user.name} logged in </p>
            <Button text='logout' mutatingFunction={handleLogout} />
            <BlogInput
                user={user}
                setBlogs={setBlogs}
                blogs={blogs}
                setConfirmMessage={setConfirmMessage}
            />
            <h2>blogs</h2>
            <Button
                text={sorted ?
                    'alphabetical'
                    :
                    'likes'
                }
                mutatingFunction={sortBlogs}
            />
        </>
    )

    return (
        <div>
            <ErrorNotification message={errorMessage} />
            <ConfirmNotification message={confirmMessage} />
            {user ?
                <>
                    <LoggedInLayout />
                    <BlogList setConfirmMessage={setConfirmMessage} blogs={blogs} setBlogs={setBlogs} user={user} />
                </>
                :
                <>
                    <UserLogin
                        setUser={setUser}
                        setErrorMessage={setErrorMessage}
                    />
                </>
            }
        </div>
    )
}

export default App
