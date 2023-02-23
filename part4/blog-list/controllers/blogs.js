const blogsRouter = require('express').Router()
const logger = require('../utils/logger.js')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    try {
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    } catch (err) {
        response.status(400)
    }
})

module.exports = blogsRouter
