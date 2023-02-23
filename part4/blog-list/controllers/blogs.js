const blogsRouter = require('express').Router()
const logger = require('../utils/logger.js')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    await Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        await blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    } catch (err) {
        next(err)
        response.status(400).json(err)
    }
})

module.exports = blogsRouter
