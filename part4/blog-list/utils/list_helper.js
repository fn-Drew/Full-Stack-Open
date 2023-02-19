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
    mostLikes
}
