const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testData = require('./testData').blogs
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const savePromises = testData.map((blog) => {
        const blogObject = new Blog(blog)
        return blogObject.save()
    })
    await Promise.all(savePromises)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

test('create new blog post', async () => {
    const newPost = {
        title: 'New Blog Post',
        author: 'Dan Young',
        url: '/',
        likes: 0,
    }
    const response = await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const newPostID = response.body.id
    const post = await Blog.findById(newPostID)
    expect(post.title).toBe(newPost.title)
    expect(post.author).toBe(newPost.author)
    expect(post.url).toBe(newPost.url)
    expect(post.likes).toBe(newPost.likes)
})

test('defaults likes to 0 when creating new blog post', async () => {
    const newPost = {
        title: 'New Blog Post',
        author: 'Dan Young',
        url: '/',
    }
    const response = await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const newPostID = response.body.id
    const post = await Blog.findById(newPostID)
    expect(post.likes).toBe(0)
})

test('missing title or author results in 400 Bad Request', async () => {
    const newPost = {
        author: 'Dan Young',
        url: '/',
    }
    await api.post('/api/blogs').send(newPost).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})
