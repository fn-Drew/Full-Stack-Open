import Togglable from "./Togglable"
const Blog = ({ blog }) => (
    <div>
        {blog.title}
        <Togglable buttonLabel='more...' >
            author: {blog.author}
            url: {blog.url}
            likes: {blog.likes}
        </Togglable>
    </div>
)

export default Blog
