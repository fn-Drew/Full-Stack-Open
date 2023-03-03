import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import ErrorNotification from './components/ErrorNotification';
import ConfirmNotification from './components/ConfirmNotification';
import UserLogin from './components/LoginForm';
import LoggedInLayout from './components/LoggedInLayout';

function App() {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((allBlogs) => setBlogs(allBlogs));
    }, []);

    // on page load check if user has logged in before
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
            const currentUser = JSON.parse(loggedUserJSON);
            setUser(currentUser);
            blogService.setToken(currentUser.token);
        }
    }, []);

    return (
        <div>
            <ErrorNotification message={errorMessage} />
            <ConfirmNotification message={confirmMessage} />
            {user
                ? (
                    <>
                        <LoggedInLayout
                            user={user}
                            setUser={setUser}
                            blogs={blogs}
                            setBlogs={setBlogs}
                            setConfirmMessage={setConfirmMessage}
                        />
                        <BlogList
                            setConfirmMessage={setConfirmMessage}
                            blogs={blogs}
                            setBlogs={setBlogs}
                            user={user}
                        />
                    </>
                )
                : (
                    <UserLogin
                        setUser={setUser}
                        setErrorMessage={setErrorMessage}
                    />
                )}
        </div>
    );
}

export default App;
