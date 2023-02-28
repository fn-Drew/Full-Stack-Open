const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')

const api = supertest(app)

// come back and do 4.6 and 4.7 at some point

const Blog = require('../models/blog')

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


describe('deleting posts', () => {

    test('delete blog by id', async () => {
        const blogs = await api.get('/api/blogs')
        console.log(blogs.body)
        const id = blogs.body[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)
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
