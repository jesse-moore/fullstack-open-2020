const blogsRouter = require('express').Router()
const { isUserDocOwner, userIDFromToken } = require('../utils')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id).populate('user', {
        username: 1,
        name: 1,
    })
    res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
    const user = await userIDFromToken(req.token)
    const blog = new Blog({ ...req.body, user: user._id })
    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    const user = await userIDFromToken(req.token)
    const doc = await Blog.findById(req.params.id)
    isUserDocOwner(user, doc)

    await doc.remove()
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const user = await userIDFromToken(req.token)
    const doc = await Blog.findById(req.params.id)
    isUserDocOwner(user, doc)

    const updatedDoc = await doc.updateOne(req.body, {
        new: true,
        runValidators: true,
        context: 'query',
    })
    res.json(updatedDoc)
})

blogsRouter.put('/:id/inclike', async (req, res) => {
    const id = req.params.id
    const { likeInc } = req.body
    if (!isFinite(likeInc)) throw Error('Bad Request')
    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { likes: likeInc } },
        {
            new: true,
            runValidators: true,
            context: 'query',
        }
    )
    res.json(updatedBlog)
})

module.exports = blogsRouter
