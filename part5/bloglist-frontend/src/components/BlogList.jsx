import React from 'react';
import Blog from './Blog';
import Button from './Button';
import blogService from '../services/blogs';

const BlogList = ({
    setBlogs,
    blogs,
    user,
    setConfirmMessage,
}) => {
    const deleteBlog = ({ mutableItem }) => {
        if (window.confirm('Do you really want to delete the post?')) {
            const mutableBlogs = blogs;
            if (mutableItem) {
                const pos = mutableBlogs.findIndex((mutableBlog) => (
                    mutableBlog.id === mutableItem.id
                ));

                mutableBlogs.splice(pos, 1);
                blogService
                    .remove(mutableItem)
                    .then(() => setBlogs(mutableBlogs));

                setConfirmMessage('Deleted blog!');
                setTimeout(() => {
                    setConfirmMessage(null);
                }, 5000);
            } else {
                console.error('blog is ', mutableItem);
            }
        }
    };

    const likeBlog = ({ mutableItem }) => {
        const postLikeInc = mutableItem;
        postLikeInc.likes += 1;

        const blogObject = {
            title: mutableItem.title,
            author: mutableItem.name,
            url: mutableItem.url,
            user: mutableItem.user,
            likes: postLikeInc.likes,
            id: mutableItem.id,
        };
        blogService
            .put(blogObject);

        // discovered this was causing the delay on update... made it instant i guess lol
        // causes rerender is why. can make this less jank but it's kind of funny
        // change at some point maybe
        setConfirmMessage('');
        setTimeout(() => {
            setConfirmMessage(null);
        }, 0);
    };

    return (
        blogs.map((blog) => (blog
            ? (
                <div key={blog.id}>
                    <Blog blog={blog} />
                    <Button
                        text="like"
                        mutableItem={blog}
                        mutatingFunction={likeBlog}
                    />
                    {blog.user.username === user.username
                        ? (
                            <Button
                                text="delete"
                                mutableItem={blog}
                                mutatingFunction={deleteBlog}
                            />
                        )
                        : null}
                </div>
            )
            : null))
    );
};

export default BlogList;
