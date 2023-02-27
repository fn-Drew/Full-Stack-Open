const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    // search for user in database by inputted username
    const user = await User.findOne({ username })
    // check if the inputted password is correct
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    // if user is not found or password is incorrect:
    // response status 401 unauthorized
    if (!(user && passwordCorrect)) {
        console.log(user)
        console.log(passwordCorrect)
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // if password is correct, create token containing username and user id
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // token is digitally signed using a string from the env SECRET
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
