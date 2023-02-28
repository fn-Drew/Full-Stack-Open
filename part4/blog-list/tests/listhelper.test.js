const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('../utils/list_helper')

const api = supertest(app)

// come back and do 4.6 and 4.7 at some point

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    // create an array of notes from the Note constructor
    const blogObjects = helper.blogs.map(blog => new Blog(blog))

    // create an array of promises for saving each item in the database
    const promiseArray = blogObjects.map(blog => blog.save())

    // waits until every promise for saving a blog is fulfilled
    await Promise.all(promiseArray)
})

describe('validate initial blog data', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 10000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.blogs.length)
    })

    test('blog has id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[1].id).toBeDefined()
    })

})

describe('creating new posts', () => {

    const newBlog = {
        title: "New Blog",
        author: "Michael Chan",
        url: "https://newblog.com/",
    }

    const missingBlog = {
        author: "Michael Chan",
        url: "https://newblog.com/",
    }

    test('can create new blog', async () => {

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
    })

    test('likes default to 0', async () => {
        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const newBlogLikes = blogsAtEnd[blogsAtEnd.length - 1].likes
        expect(newBlogLikes).toBe(0)
    })

    test('cannot add blog with no title', async () => {

        await api
            .post('/api/blogs/')
            .send(missingBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length)

    })
})

describe('mutating existing posts', () => {

    test('delete blog by id', async () => {
        const blogs = await api.get('/api/blogs')
        const id = blogs.body[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)
    })

    // works but doesn't keep the same id. although idk if it should?
    test('edit blog by id', async () => {
        const blogs = await api.get('/api/blogs')
        const startBlog = blogs.body[0]
        const newBlog = {
            title: "React patterns NEW",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 23,
        }

        await api
            .put(`/api/blogs/${startBlog.id}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length)
        expect(newBlog.title).toBe(blogsAtEnd[0].title)
        expect(newBlog.author).toBe(blogsAtEnd[0].author)
        expect(newBlog.likes).toBe(blogsAtEnd[0].likes)
        expect(newBlog.url).toBe(blogsAtEnd[0].url)
    })


})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'bean', passwordHash })

        await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('like validation', () => {

    test('total likes', () => {
        const result = helper.totalLikes(helper.blogs)
        expect(result).toBe(36)
    })

    test('when there is only one blog, equals the likes of that', () => {
        const result = helper.totalLikes(helper.blogWithOnePost)
        expect(result).toBe(30)
    })

    test('when there is no helper.blogs, like should be 0', () => {
        const result = helper.totalLikes(helper.emptyList)
        expect(result).toBe(0)
    })

    test('return blog with most likes', () => {
        const result = helper.mostLikes(helper.blogs)
        expect(result).toBe(helper.blogs[2])
    })

    test('return only blog', () => {
        const result = helper.mostLikes(helper.blogWithOnePost)
        expect(result).toBe(helper.blogWithOnePost[0])
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})
