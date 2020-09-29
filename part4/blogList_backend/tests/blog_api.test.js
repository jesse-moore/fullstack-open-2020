const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initBlogs, initUsers } = require('./init_db')
const { users } = require('./testData')

const api = supertest(app)

beforeAll(async () => {
    const users = await initUsers()
    await initBlogs(users)
})

describe('retrieving blogs', () => {
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
    test('blogs are returned with creators user data', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        expect(blog.user).toBeDefined()
        expect(blog.user.username).toBeDefined()
        expect(blog.user.name).toBeDefined()
        expect(blog.user.id).toBeDefined()
    })
})

describe('creating new blog post', () => {
    let token
    beforeAll(async () => {
        const { username, password } = users[0]
        const { body } = await api
            .post('/api/login')
            .send({ username, password })
        token = body.token
    })
    test('successfully creates new blog post', async () => {
        const newPost = {
            title: 'New Blog Post',
            author: 'Dan Young',
            url: '/',
            likes: 0,
        }
        const response = await api
            .post('/api/blogs')
            .send(newPost)
            .set({ Authorization: `bearer ${token}` })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newPostID = response.body.id
        const post = await Blog.findById(newPostID)
        expect(post.title).toBe(newPost.title)
        expect(post.author).toBe(newPost.author)
        expect(post.url).toBe(newPost.url)
        expect(post.likes).toBe(newPost.likes)
    })

    test('defaults likes to 0', async () => {
        const newPost = {
            title: 'New Blog Post 2',
            author: 'Dan Young',
            url: '/',
        }
        const response = await api
            .post('/api/blogs')
            .send(newPost)
            .set({ Authorization: `bearer ${token}` })
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
        await api
            .post('/api/blogs')
            .send(newPost)
            .set({ Authorization: `bearer ${token}` })
            .expect(400)
    })
})

describe('updating blog post', () => {
    let token
    beforeAll(async () => {
        const { username, password } = users[0]
        const { body } = await api
            .post('/api/login')
            .send({ username, password })
        token = body.token
    })
    test('successfully updates blog post', async () => {
        const blogs = await Blog.find({})
        const { id } = jwt.verify(token, SECRET)
        const blogToUpdate = blogs.filter((blog) => {
            return blog.user.toString() === id
        })[0]
        const updateBlogID = blogToUpdate.id
        const update = {
            title: 'Updated Blog Post',
        }
        await api
            .put(`/api/blogs/${updateBlogID}`)
            .send(update)
            .set({ Authorization: `bearer ${token}` })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const updatedBlog = await Blog.findById(blogToUpdate.id)
        expect(updatedBlog.title).toBe(update.title)
    })
    test('fails to update blog post not created by user', async () => {
        const blogs = await Blog.find({})
        const { id } = jwt.verify(token, SECRET)

        const blogToUpdate = blogs.filter((blog) => {
            return blog.user.toString() !== id
        })[0]
        const updateBlogID = blogToUpdate.id
        const update = {
            title: 'Updated Blog Post',
        }
        await api
            .put(`/api/blogs/${updateBlogID}`)
            .send(update)
            .set({ Authorization: `bearer ${token}` })
            .expect(401)
    })
    test('increments likes', async () => {
        const blogs = await Blog.find({})
        const updateBlogID = blogs[0].id
        const likes = blogs[0].likes
        const likeInc = {
            likeInc: 1,
        }
        await api
            .put(`/api/blogs/${updateBlogID}/inclike`)
            .send(likeInc)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const updatedBlog = await Blog.findById(updateBlogID)
        expect(updatedBlog.likes).toBe(likes + likeInc.likeInc)
    })
})

describe('deleting blog post', () => {
    let token
    beforeAll(async () => {
        const { username, password } = users[0]
        const { body } = await api
            .post('/api/login')
            .send({ username, password })
        token = body.token
    })
    test('successfully deletes blog', async () => {
        const blogs = await Blog.find({})
        const blogsCount = blogs.length
        const { id } = jwt.verify(token, SECRET)
        const blogToDelete = blogs.filter((blog) => {
            return blog.user.toString() === id
        })[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: `bearer ${token}` })
            .expect(204)

        const blogsAfter = await Blog.find({})
        const blogsCountAfter = blogsAfter.length
        const blogTitles = blogsAfter.map((b) => b.title)

        expect(blogsCountAfter).toBe(blogsCount - 1)
        expect(blogTitles).not.toContain(blogToDelete.title)
    })
    test('fails to delete blog post not created by user', async () => {
        const blogs = await Blog.find({})
        const blogsCount = blogs.length
        const { id } = jwt.verify(token, SECRET)

        const blogToDelete = blogs.filter((blog) => {
            return blog.user.toString() !== id
        })[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: `bearer ${token}` })
            .expect(401)

        const blogsAfter = await Blog.find({})
        const blogsCountAfter = blogsAfter.length
        const blogTitles = blogsAfter.map((b) => b.title)

        expect(blogsCountAfter).toBe(blogsCount)
        expect(blogTitles).toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
