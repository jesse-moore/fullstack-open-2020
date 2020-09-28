const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const updates = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
        context: 'query',
    })
    res.json(updatedBlog)
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
