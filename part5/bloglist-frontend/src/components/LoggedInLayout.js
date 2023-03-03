import { useState } from "react"
import BlogInput from "./BlogInput"
import Button from "./Button"

const LoggedInLayout = ({
    user,
    blogs,
    setBlogs,
    setUser,
    setConfirmMessage
}) => {
    const [sorted, setSorted] = useState(true)

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

    return (
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
}

export default LoggedInLayout
