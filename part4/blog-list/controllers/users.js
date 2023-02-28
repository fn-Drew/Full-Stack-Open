const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    await User
        .find({})
        .then(users => {
            response.json(users)
        })
})

usersRouter.post('/', async (request, response, next) => {
    const user = new User(request.body)

    await user
        .save()
        .then(result => {
            response.status(201).json(result)
        })

})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        response.status(204)
    } catch (err) {
        next(err)
        response.status(400).json(err)
    }
})

module.exports = usersRouter
