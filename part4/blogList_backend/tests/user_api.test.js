const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { initBlogs, initUsers } = require('./init_db')

const api = supertest(app)

beforeAll(async () => {
    const users = await initUsers()
    await initBlogs(users)
})

describe('retrieving users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('users are returned with blogs created by user', async () => {
        const response = await api.get('/api/users')
        const user = response.body[0]
        expect(user.blogs).toBeDefined()
        const { url, title, author, id } = user.blogs[0]
        expect(url).toBeDefined()
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(id).toBeDefined()
    })
    test('individual user is returned with blogs created by user', async () => {
        const usersResponse = await api.get('/api/users')
        const userID = usersResponse.body[0].id
        const userResponse = await api.get(`/api/users/${userID}`)
        const user = userResponse.body
        expect(user.blogs).toBeDefined()
        const { url, title, author, id } = user.blogs[0]
        expect(url).toBeDefined()
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(id).toBeDefined()
    })
})

describe('creating users', () => {
    test('user is created', async () => {
        const newUser = {
            username: 'jamie85',
            name: 'jamie smith',
            password: '123password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const user = await User.findOne({ username: newUser.username })
        expect(user).not.toBe(null)
    })
    test('username cannot be less than 3 characters', async () => {
        const invalidUser = {
            username: 'ja',
            name: 'jamie smith',
            password: '123password',
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect((res) => res.body.error)
    })
    test('username must be unique', async () => {
        const invalidUser = {
            username: 'jamie85',
            name: 'jamie smith',
            password: '123password',
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect((res) => res.body.error)
    })
    test('password cannot be less than 3 characters', async () => {
        const invalidUser = {
            username: 'jamie85',
            name: 'jamie smith',
            password: '12',
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect((res) => res.body.error)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
