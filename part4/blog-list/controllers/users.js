const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const allUsers = await User.find({})
    response.status(200).json(allUsers)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response, next) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204)
})

module.exports = usersRouter
