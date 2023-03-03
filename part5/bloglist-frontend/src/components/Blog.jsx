import React from 'react';
import Togglable from './Togglable';

function Blog({ blog }) {
    return (
        <div>
            {blog.title}
            <Togglable buttonLabel="more...">
                author:
                {' '}
                {blog.author}
                url:
                {' '}
                {blog.url}
                likes:
                {' '}
                {blog.likes}
            </Togglable>
        </div>
    );
}

export default Blog;
