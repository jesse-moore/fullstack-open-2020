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
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
    })
    res.json(users)
})

usersRouter.get('/postcount', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
    })
    const usersPostCount = users.map((user) => {
        return { name: user.name, id: user.id, blogs: user.blogs.length }
    })
    res.json(usersPostCount)
})

usersRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
    })
    res.json(user)
})

module.exports = usersRouter
