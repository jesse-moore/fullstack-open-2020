const bcrypt = require('bcrypt')
const validatePassword = require('../utils/validatePassword')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const body = req.body
    const isPasswordValid = validatePassword(body.password)
    if (!isPasswordValid.isValid) throw Error(isPasswordValid.error)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = usersRouter
