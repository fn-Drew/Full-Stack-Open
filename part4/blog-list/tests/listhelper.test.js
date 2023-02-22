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

test('blogs are returned', async () => {
    await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000)

describe("get total likes", () => {

    test('total likes', () => {
        const result = helper.totalLikes(helper.blogs)
        expect(result).toBe(40)
    })

    test('when there is only one blog, equals the likes of that', () => {
        const result = helper.totalLikes(helper.blogWithOnePost)
        expect(result).toBe(30)
    })

    test('when there is no helper.blogs, like should be 0', () => {
        const result = helper.totalLikes(helper.emptyList)
        expect(result).toBe(0)
    })

})
describe("get most likes", () => {

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
