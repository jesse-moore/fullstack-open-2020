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
})

describe('creating new blog post', () => {
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
})

describe('updating blog post', () => {
    test('successfully updates blog post', async () => {
        const getBlogs = async () => {
            const response = await api.get('/api/blogs')
            return response.body
        }
        const blogs = await getBlogs()
        const updateBlogID = blogs[0].id
        const update = {
            title: 'Updated Blog Post',
        }
        await api
            .put(`/api/blogs/${updateBlogID}`)
            .send(update)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const updatedBlogs = await getBlogs()
        const updatedBlog = updatedBlogs[0]
        expect(updatedBlog.title).toBe(update.title)
    })

    test('increments likes', async () => {
        const getBlogs = async () => {
            const response = await api.get('/api/blogs')
            return response.body
        }
        const blogs = await getBlogs()
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

        const updatedBlogs = await getBlogs()
        const updatedBlog = updatedBlogs[0]
        expect(updatedBlog.likes).toBe(likes + likeInc.likeInc)
    })
})

describe('deleting blog post', () => {
    test('successfully deletes blog', async () => {
        const getBlogs = async () => {
            const response = await api.get('/api/blogs')
            return response.body
        }
        const blogs = await getBlogs()
        const blogsCount = blogs.length
        const blogToDeleteID = blogs[0].id

        await api.delete(`/api/blogs/${blogToDeleteID}`).expect(204)

        const blogsAfter = await getBlogs()
        const blogsCountAfter = blogsAfter.length
        const blogTitles = blogsAfter.map((b) => b.title)

        expect(blogsCountAfter).toBe(blogsCount - 1)
        expect(blogTitles).not.toContain(blogs[0].title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
