const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { initUsers, initBlogs } = require('../tests/init_db')

testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

testingRouter.post('/initdb', async (request, response) => {
    const users = await initUsers()
    await initBlogs(users)
    response.status(204).end()
})

module.exports = testingRouter
