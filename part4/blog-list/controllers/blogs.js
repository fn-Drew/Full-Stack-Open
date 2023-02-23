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

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter
