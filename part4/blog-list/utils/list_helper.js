const blogs = [
    {
        "title": "woah title of the post",
        "likes": 2
    },
    {
        "title": "another title yipee",
        "likes": 8
    },
    {
        "title": "ega goga!!!",
        "likes": 30
    }
]

const blogWithOnePost = [
    {
        "title": "ega goga!!!",
        "likes": 30
    }
]

const emptyList = []

const totalLikes = (blogs) => {
    const likes = []
    blogs.map((blog) => likes.push(blog.likes))
    return likes.length === 0
        ? 0
        : likes.reduce((totalLikes, postLikes) => totalLikes + postLikes)
}

const mostLikes = (blogs) => {
    return blogs.reduce((prev, current) => (+prev.id > +current.id) ? prev : current)
}

module.exports = {
    totalLikes,
    mostLikes,
    blogs,
    blogWithOnePost,
    emptyList
}
