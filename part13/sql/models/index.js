const Note = require('./note')
const User = require('./user')

Note.sync()

module.exports = {
    Note, User,
}
